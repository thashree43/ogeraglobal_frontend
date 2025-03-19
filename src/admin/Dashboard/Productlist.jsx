import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetproductsQuery, useAddproductMutation, useUpdateproductMutation,useDeleteproductMutation } from "../../api/Adminapi";

const Productlist = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        status: "",
        category: "",
        images: Array(4).fill(null),
        imagePreviews: Array(4).fill(null),
    });

    // Use RTK Query hook to fetch products
    const { data: productsData, error, isLoading, refetch } = useGetproductsQuery();
    const [addProduct] = useAddproductMutation();
    const [deleteproduct] = useDeleteproductMutation()
    const [updateproduct] = useUpdateproductMutation()
    
    // Update categories when products data changes
    useEffect(() => {
        if (productsData?.categories) {
            setCategories(productsData.categories);
        }
    }, [productsData]);

    // Status styling functions remain the same...
    const getStatusStyle = (status) => {
        switch (status) {
            case 'in_stock':
                return 'bg-green-100 text-green-700';
            case 'out_of_stock':
                return 'bg-red-100 text-red-700';
            case 'new_arrival':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'in_stock':
                return 'In Stock';
            case 'out_of_stock':
                return 'Out of Stock';
            case 'new_arrival':
                return 'New Arrival';
            default:
                return 'Unknown';
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                status: product.status,
                category: product.category[0], 
                images: product.image || Array(4).fill(null), 
                imagePreviews: product.image || Array(4).fill(null), 
            });
            setEditingProductId(product._id);
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                status: "in_stock",
                category: "",
                images: Array(4).fill(null),
                imagePreviews: Array(4).fill(null)
            });
            setEditingProductId(null);
        }
        setModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleImageChange = (index, event) => {
        const file = event.target.files[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...formData.images];
                const newPreviews = [...formData.imagePreviews];
                newImages[index] = file;
                newPreviews[index] = reader.result;
                setFormData({ ...formData, images: newImages, imagePreviews: newPreviews });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index) => {
        const newImages = [...formData.images];
        const newPreviews = [...formData.imagePreviews];
        newImages[index] = null;
        newPreviews[index] = null;
        setFormData({ ...formData, images: newImages, imagePreviews: newPreviews });
    };

    // Save product function modified to handle array fields
    const saveProduct = async () => {
        if (!formData.name || !formData.description || !formData.price || !formData.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("status", formData.status);
            data.append("category", formData.category);

            // Append each file individually
            formData.images.forEach((file, index) => {
                data.append(`images`, file);  
            });
            if (editingProductId) {
                await updateproduct({id:editingProductId,formData}).unwrap()
                toast.success("Product updated successfully");
                refetch()
            } else {
                console.log("the datas while sending to the backend ", formData);

                await addProduct(data).unwrap();
                console.log("toast is gone work");

                toast.success("Product added successfully");
                refetch()
            }
            setModalOpen(false);
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Error saving product");
        }
    };
    const toggleProductStatus = (productId, currentStatus) => {
        const statusOrder = ['in_stock', 'out_of_stock', 'new_arrival'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        toast.success("Successfully updated status");
    };

    const handleDelete = async (productId) => {
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
                    await deleteproduct(productId).unwrap();
                    toast.success("Product deleted successfully");
                    refetch();
                } catch (error) {
                    console.error("Error deleting category:", error);
                    toast.error("Failed to delete category");
                }
            }
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;

    // Ensure productsData exists and has the expected structure
    const products = productsData?.products || [];
    const categoriesData = productsData?.categories || [];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header section remains the same... */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2"
                >
                    <span>+</span> Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">S.NO</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product, index) => (
                                <tr key={product._id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.image?.[0] || "/api/placeholder/50/50"}
                                            alt="Product"
                                            className="w-12 h-12 object-cover rounded-lg shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{product.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{product.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {categoriesData.find(cat => cat._id === (product.category?.[0] || product.category))?.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">₹.{product.price} /-</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(product.status)}`}>
                                                {getStatusLabel(product.status)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-4">
                                            <button
                                                onClick={() => openModal(product)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="p-6 space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                                {editingProductId ? "Edit Product" : "Add Product"}
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Product Description"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition resize-none"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Product Price"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                                />
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                                >
                                    <option value="">Select Status</option>
                                    <option value="in_stock">In Stock</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                    <option value="new_arrival">New Arrival</option>
                                </select>

                                <div className="space-y-4">
                                    {formData.imagePreviews.map((preview, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            {preview && (
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-200"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageChange(index, e)}
                                                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
                                                />
                                            </div>
                                            {preview && (
                                                <button
                                                    onClick={() => removeImage(index)}
                                                    className="text-red-600 hover:text-red-800 transition font-medium"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveProduct}
                                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition font-medium"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productlist;