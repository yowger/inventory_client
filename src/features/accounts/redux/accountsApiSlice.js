import { formatDistance } from "date-fns"
import { apiSlice } from "../../../app/api/apiSlice"

export const accountsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            method: "GET",
            query: () => ({
                url: "/users",
            }),
            transformResponse: (responseData) => {
                const transformedData = responseData.map((user) => {
                    user.updatedAt = formatDistance(
                        new Date(user.updatedAt),
                        Date.now(),
                        {
                            addSuffix: true,
                        }
                    )

                    return user
                })

                return transformedData
            },
            providesTags: (result, error, arg) => {
                if (result) {
                    const cachedItems = [
                        { type: "User", id: "LIST" },
                        ...result.map(({ _id }) => {
                            return {
                                type: "User",
                                id: _id,
                            }
                        }),
                    ]
                    return cachedItems
                } else return [{ type: "User", id: "LIST" }]
            },
        }),
        updateUserLogin: builder.mutation({
            query: ({ id }) => ({
                method: "Post",
                url: "/users/updateLogin",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
    }),
})

// deleteItem: builder.mutation({
//     query: ({ ids }) => ({
//         url: `/items`,
//         method: "DELETE",
//         body: { ids },
//     }),

export const { useGetUsersQuery, useUpdateUserLoginMutation } = accountsApiSlice
