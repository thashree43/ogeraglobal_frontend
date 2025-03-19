import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseurluser = `${import.meta.env.VITE_BASE_URL}/api/admin`;

const baseQuery = fetchBaseQuery({
    baseUrl: baseurluser,
    credentials: 'include',
});
export const AdminApislice = createApi({
    reducerPath: 'adminapi',
    baseQuery,
    tagTypes: ['Category', 'Products', 'Sales'],
    endpoints: (builder) => ({
        // admin register part
        adminregister: builder.mutation({
            query: (admindatas) => ({
                url: "/register",
                method: "POST",
                body: admindatas
            })
        }),
        verifyotp: builder.mutation({
            query: (otpData) => ({
                url: "/verify-otp",
                method: "POST",
                body: otpData
            })
        }),
        resendotp: builder.mutation({
            query: (emailData) => ({
                url: "/resend-otp",
                method: "POST",
                body: emailData
            })
        }),
        adminlogin: builder.mutation({
            query: (admindata) => ({
                url: "/login",
                method: "POST",
                body: admindata
            })
        }),
        // category part begin
        addcategory: builder.mutation({
            query: (categorydata) => ({
                url: "/addcategory",
                method: "POST",
                body: categorydata
            }),
            invalidatesTags: ['Category'],
        }),
        getcategory: builder.query({
            query: () => '/getcategory',
            transformResponse: (response) => {
                console.log('API Response:', response);
                return response.categories || [];
            },
            providesTags: ['Category'],
        }),
        updateCategoryStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/updatestatus/${id}`,
                method: "PATCH",
                body: { status },
            }),
        }),
        editCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/editcategory/${id}`,
                method: "PATCH",
                body: formData,
            }),
        }),
        deletecategory: builder.mutation({
            query: (id) => ({
                url: `/deletecategory/${id}`,
                method: "DELETE",
            })
        }),
        // product section
        getproducts: builder.query({
            query: () => '/getproducts',
            transformResponse: (response) => {
                console.log('API Response:', response);
                return {
                    products: response.products || [],
                    categories: response.categories || [],
                };
            },
            providesTags: ['Products'],
        }),
        addproduct: builder.mutation({
            query: (formData) => ({
                url: "/addproduct",
                method: "POST",
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Products']
        }),
        updateproduct:builder.mutation({
            query:({id,formData})=>({
                url:`/updateproduct/${id}`,
                method:"PATCH",
                body:formData
            })
        }),
        deleteproduct: builder.mutation({
            query: (id) => ({
                url: `/deleteproduct/${id}`,
                method: "DELETE"
            })
        }),
    }),
})

export const {
    // register part
    useAdminregisterMutation,
    useVerifyotpMutation,
    useResendotpMutation,
    useAdminloginMutation,

    // category part
    useAddcategoryMutation,
    useGetcategoryQuery,
    useUpdateCategoryStatusMutation,
    useEditCategoryMutation,
    useDeletecategoryMutation,

    // product part
    useGetproductsQuery,
    useAddproductMutation,
    useUpdateproductMutation,
    useDeleteproductMutation,

} = AdminApislice