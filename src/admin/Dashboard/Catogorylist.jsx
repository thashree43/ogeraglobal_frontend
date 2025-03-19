import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAddcategoryMutation, useGetcategoryQuery, useUpdateCategoryStatusMutation, useEditCategoryMutation ,useDeletecategoryMutation} from "../../api/Adminapi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const CategoryList = () => {
    const { data: categories = [], isLoading, error, refetch } = useGetcategoryQuery();
    const [addcategory] = useAddcategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const [updatestatus] = useUpdateCategoryStatusMutation();
    const [deleteCategory] = useDeletecategoryMutation(); 

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", status: "active" });

// Open Add/Edit Modal
    const openModal = (category = null) => {
        if (category) {
            setFormData({ name: category.name, description: category.description, status: category.status });
            setEditingCategoryId(category._id);
        } else {
            setFormData({ name: "", description: "", status: "active" });
            setEditingCategoryId(null);
        }
        setModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

// Save Category (Add/Edit)
    const saveCategory = async () => {
        if (!formData.name || !formData.description) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (editingCategoryId) {
// Edit category
                await editCategory({ id: editingCategoryId, formData }).unwrap();
                toast.success("Category updated successfully");
            } else {
// Add category
                await addcategory(formData).unwrap();
                toast.success("Category added successfully");
            }
            refetch();
        } catch (error) {
            console.error("Error saving category:", error);
        }
        setModalOpen(false);
    };

// update status
    const toggleCategoryStatus = async (categoryId, currentStatus) => {
        if (!categoryId) {
            console.error("Category ID is undefined!");
            return;
        }

        const newStatus = currentStatus === "active" ? "inactive" : "active";

        try {
            await updatestatus({ id: categoryId, status: newStatus }).unwrap();
            toast.success("Successfully updated status");
            refetch();
        } catch (error) {
            console.error("Error updating category status:", error);
        }
    };

// delete category
const handleDelete = async (categoryId) => {
    if (!categoryId) {
        console.error("Category ID is undefined!");
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await deleteCategory(categoryId).unwrap();
                toast.success("Category deleted successfully");
                refetch();
            } catch (error) {
                console.error("Error deleting category:", error);
                toast.error("Failed to delete category");
            }
        }
    });
};

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories!</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Category List</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-gradient-to-r from-red-600 to-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                    + Add Category
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">S.NO</th>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-center">Status</th>
                            <th className="py-2 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id || index} className="border-b">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{category.name}</td>
                                <td className="py-2 px-4">{category.description}</td>
                                <td
                                    className="py-2 px-4 text-center cursor-pointer"
                                    onClick={() => toggleCategoryStatus(category._id, category.status)}
                                >
                                    <span className={`px-3 py-1 rounded-md text-white ${category.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                        {category.status === "active" ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="py-2 px-4 text-center flex justify-center gap-4">
                                    <button onClick={() => openModal(category)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit Category */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">{editingCategoryId ? "Edit Category" : "Add Category"}</h3>

                        <div className="mb-3">
                            <label className="block text-gray-700">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
                        </div>

                        <div className="mb-3">
                            <label className="block text-gray-700">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button onClick={() => setModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={saveCategory} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                {editingCategoryId ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
