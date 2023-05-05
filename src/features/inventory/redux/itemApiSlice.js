import { format } from "date-fns"
import { apiSlice } from "../../../app/api/apiSlice"

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            method: "GET",
            query: ({
                page = 1,
                perPage = 10,
                search = "",
                category = "",
                sort = "",
            }) => ({
                url: `/items?page=${page}&per_page=${perPage}&search=${search}&category=${category}&sort=${sort}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData) => {
                const transformedData = responseData?.items[0]?.data.map(
                    (item) => {
                        item.createdAt = format(
                            new Date(item.createdAt),
                            "MM/dd/yyyy"
                        )

                        item.updatedAt = format(
                            new Date(item.updatedAt),
                            "MM/dd/yyyy"
                        )

                        return item
                    }
                )

                const totalItems = responseData?.items[0]?.totalCount[0]?.total

                const categories = responseData?.items[0]?.categories.map(
                    (category) => category._id
                )

                return {
                    items: transformedData,
                    categories,
                    pageDetails: { totalItems },
                }
            },
            providesTags: (result, error, arg) => {
                if (result?.items) {
                    const cachedItems = [
                        { type: "Item", id: "LIST" },
                        ...result.items.map(({ _id }) => {
                            return {
                                type: "Item",
                                id: _id,
                            }
                        }),
                    ]
                    return cachedItems
                } else return [{ type: "Item", id: "LIST" }]
            },
        }),
        addItem: builder.mutation({
            query: (data) => ({
                url: "/items",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Item", id: "LIST" }],
        }),
        addManyItems: builder.mutation({
            // query: (data) => ({
            query: (data) => ({
                url: "/items/many",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Item", id: "LIST" }],
        }),
        removeItems: builder.mutation({
            query: (ids) => ({
                url: `/items/many`,
                method: "PATCH",
                body: ids,
            }),
            invalidatesTags: (result, error, arg) => [
                ...arg.ids.map(({ id }) => ({
                    type: "Item",
                    id: id,
                })),
            ],
        }),
        deleteItem: builder.mutation({
            query: ({ ids }) => ({
                url: `/items`,
                method: "DELETE",
                body: { ids },
            }),
            // invalidatesTags: (result, error, arg) => {
            //     if (result) {
            //         return [{ type: "Item", id: "LIST" }]
            //     }
            // },

            invalidatesTags: (result, error, arg) => [
                { type: "Item", id: "LIST" },
                ...arg.ids.map(({ id }) => ({
                    type: "Item",
                    id: id,
                })),
            ],
        }),
        updateItem: builder.mutation({
            query: (data) => ({
                url: `/items`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Item", id: arg.id },
            ],
        }),
    }),
})

export const {
    useGetItemsQuery,
    useAddItemMutation,
    useAddManyItemsMutation,
    useRemoveItemsMutation,
    useDeleteItemMutation,
    useUpdateItemMutation,
} = itemApiSlice

// import { apiSlice } from "../../app/api/apiSlice"
// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

// export const usersApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getUsers: builder.query({
//             query: () => "/user",
//             method: "GET",
//             // validateStatus: (response, result) => {
//             //     return response.status === 200 && !result.isError
//             // },
//             transformResponse: (responseData) => {
//                 console.log(
//                     "🚀 ~ file: usersApiSlice.js:22 ~ responseData",
//                     responseData
//                 )

//                 const loadedData = responseData?.users.map((user) => {
//                     user.id = user._id
//                     return user
//                 })

//                 return loadedData
//             },
//             providesTags: (result, error, arg) => {
//                 if (result?.ids) {
//                     return [
//                         { type: "User", id: "LIST" },
//                         ...result.ids.map((id) => ({ type: "User", id })),
//                     ]
//                 } else return [{ type: "User", id: "LIST" }]
//             },
//         }),
//         addNewUser: builder.mutation({
//             query: (data) => ({
//                 url: "/user",
//                 method: "POST",
//                 body: { ...data },
//             }),
//             invalidatesTags: [{ type: "User", id: "LIST" }],
//         }),
//     }),
// })

// export const { useAddNewUserMutation, useGetUsersQuery } = usersApiSlice
