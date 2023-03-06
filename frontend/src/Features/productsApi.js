import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => `products`,
        })
    })
})

export const  { useGetAllProductQuery }  = productsApi




// query: () => `products${id}` =>> stata spice product


