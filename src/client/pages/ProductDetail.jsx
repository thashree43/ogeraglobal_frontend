import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Cards from "../../Reusable/Cards";
import { useParams } from "react-router-dom";
import { useProductdetailsQuery, useEmailsubmitMutation } from "../../api/Clientapi";
import { Toast } from "bootstrap";
import { toast } from "react-toastify";

const ProductDisplay = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useProductdetailsQuery(id, {
        skip: !id,
    });
    const [emailsubmit, { isLoading: isSubmitting }] = useEmailsubmitMutation();
    const [page, setPage] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);
    
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
        place: "",
        pincode: "",
        emailId: "",
        productId: id
    });
    
    // Update productId if id changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            productId: id
        }));
    }, [id]);
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Create submission data with product details
            const formDataWithProduct = {
                ...formData,
                productId: id,
                productName: data?.productdata?.name || "Unknown Product"
            };
            
            console.log("Form submitted:", formDataWithProduct);
            
            // Submit the form data
            const response = await emailsubmit(formDataWithProduct).unwrap();
            console.log("response while submitting the form ",response);
            
            // Handle success
            if (response && response.success) {
                // Show success toast using PrimeReact Toast
                toast.success("Email sent successfully");
                
                // Reset form
                setFormData({
                    name: "",
                    mobileNumber: "",
                    place: "",
                    pincode: "",
                    emailId: "",
                    productId: id
                });
                
                // Close modal
                setShowModal(false);
            } else {
                // Show error toast if response exists but success is false
                toast.error(response?.message || "Failed to send inquiry");

            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting inquiry. Please try again.");

        }
    };
    
    if (!id) return <p>No product ID provided</p>;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product: {error.message || JSON.stringify(error)}</p>;
    if (!data) return <p>No product data available</p>;

    const product = data?.productdata;
    const relatedProducts = data?.catproducts || [];

    if (!product) return <p>Product not found</p>;

    const images = product.image || [];
    const handleImageClick = (img) => setMainImage(img);

    // Handle mouse movement for zoom effect
    const handleMouseMove = (e) => {
        if (imageRef.current) {
            const { left, top, width, height } = imageRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoomPosition({ x, y });
        }
    };

    // Determine status color
    const statusColor =
        product.status === "in_stock" ? "text-green-700" :
        product.status === "out_of_stock" ? "text-blue-700" :
        "text-red-700";

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2">
                        <div 
                            className="relative group overflow-hidden"
                            onMouseEnter={() => setShowZoom(true)}
                            onMouseLeave={() => setShowZoom(false)}
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                ref={imageRef}
                                src={mainImage || (images.length > 0 ? images[0] : 'placeholder.jpg')}
                                alt={product.name || 'Product'}
                                className="w-full h-96 object-cover transition-transform duration-300"
                            />
                            
                            {/* Zoom overlay */}
                            {showZoom && (
                                <div className="absolute top-0 right-0 bg-white shadow-lg w-64 h-64 overflow-hidden border-2 border-gray-200">
                                    <div 
                                        style={{
                                            backgroundImage: `url(${mainImage || (images.length > 0 ? images[0] : 'placeholder.jpg')})`,
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            backgroundSize: '400%',
                                            backgroundRepeat: 'no-repeat',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Thumbnails */}
                        <div className="flex gap-2 mt-2">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-16 h-16 object-cover cursor-pointer border-2 
                                    ${(mainImage === img || (!mainImage && index === 0)) 
                                        ? 'border-purple-500' 
                                        : 'border-transparent hover:border-purple-500'}`}
                                    onClick={() => handleImageClick(img)}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, index) => (
                                <FaStar key={index} className="text-yellow-500" />
                            ))}
                            <span className="ml-2 text-gray-600">(120 Reviews)</span>
                        </div>
                        
                        <div className="mt-4 border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-gray-800">Product Details:</h3>
                            <p className="text-gray-700 mt-2">{product.description}</p>
                            <p className="text-gray-700 mt-2">{product.category.name}</p>
                            <p className={`${statusColor} mt-2`}>{product.status}</p>
                        </div>
                       
                        <div className="mt-4 border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-gray-800">Specifications:</h3>
                            <ul className="mt-2 space-y-1">
                                {product.specifications && product.specifications.map((spec, index) => (
                                    <li key={index} className="text-gray-700">{spec}</li>
                                ))}
                                {!product.specifications && (
                                    <>
                                        <li className="text-gray-700">Material: Premium Quality</li>
                                        <li className="text-gray-700">Dimensions: Standard</li>
                                        <li className="text-gray-700">Color: As shown</li>
                                    </>
                                )}
                            </ul>
                        </div>
                        
                        <button 
                            onClick={() => setShowModal(true)}
                            className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded w-full transition duration-200"
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>
                
                
                {/* Divider */}
                <div className="my-12 border-b border-gray-300"></div>
                
                {/* Related Products Section */}
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-6">Related Products</h3>
                    <Cards products={relatedProducts} />
                    <div className="flex justify-center my-6">
                        <button 
                            onClick={() => setPage(page - 1)} 
                            disabled={page === 1} 
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 mx-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => setPage(page + 1)} 
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 mx-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Enquiry Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Enquire About {product.name}</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Name*
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                    Mobile Number*
                                </label>
                                <input 
                                    type="tel" 
                                    id="mobileNumber" 
                                    name="mobileNumber" 
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{10}"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="emailId" className="block text-gray-700 text-sm font-bold mb-2">
                                    Email ID*
                                </label>
                                <input 
                                    type="email" 
                                    id="emailId" 
                                    name="emailId" 
                                    value={formData.emailId}
                                    onChange={handleInputChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="place" className="block text-gray-700 text-sm font-bold mb-2">
                                    Place*
                                </label>
                                <input 
                                    type="text" 
                                    id="place" 
                                    name="place" 
                                    value={formData.place}
                                    onChange={handleInputChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
                                    Pincode*
                                </label>
                                <input 
                                    type="text" 
                                    id="pincode" 
                                    name="pincode" 
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{6}"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            
                            {/* Hidden product ID field - not displayed to user but included in form submission */}
                            <input 
                                type="hidden"
                                name="productId"
                                value={id}
                            />
                            
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <Footer />
        </>
    );
};

export default ProductDisplay;