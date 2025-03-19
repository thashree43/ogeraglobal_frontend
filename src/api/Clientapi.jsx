import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseurluser = `${import.meta.env.VITE_BASE_URL}/`;

const baseQuery = fetchBaseQuery({
  baseUrl: baseurluser,
  credentials: 'include',
});
export const ClientApislice = createApi({
  reducerPath: 'clientapi',
  baseQuery,
  tagTypes: ['Category', 'Products'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/listcategories",
      providesTags: ['Category'],
    }),
    newarrivals: builder.query({
      query: () => "/newarrivals",
      providesTags: ['Category'],
    }),
    categorycarousel: builder.query({
      query: () => "/categorycarosole",
      providesTags: ['Category'],
    }),
    getproducts: builder.query({
      query: () => "/getproducts",
      providesTags: ['Category', 'Products'],
    }),
    productdetails: builder.query({
      query: (id) => `/productdetail/${id}`,
      providesTags: ['Category', 'Products'],
    }),
    emailsubmit:builder.mutation({
      query:(formdata)=>({
        url:"/emailsubmit",
        method:"POST",
        body:formdata
      })
    })

  }),
});

export const {
  useGetCategoriesQuery,
  useNewarrivalsQuery,
  useCategorycarouselQuery,
  useGetproductsQuery,
  useProductdetailsQuery,
  useEmailsubmitMutation,
  
} = ClientApislice;
