import { format } from "date-fns"
import { apiSlice } from "../../../app/api/apiSlice"

export const trashApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInactiveItems: builder.query({
            method: "GET",
            query: ({
                page = 1,
                perPage = 10,
                search = "",
                category = "",
                sort = "",
            }) => ({
                url: `/trash?page=${page}&per_page=${perPage}&search=${search}&category=${category}&sort=${sort}`,
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
        deleteItem: builder.mutation({
            query: ({ ids }) => ({
                url: `/items`,
                method: "DELETE",
                body: { ids },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Item", id: "LIST" },
                ...arg.ids.map(({ id }) => ({
                    type: "Item",
                    id: id,
                })),
            ],
        }),
    }),
})

export const { useGetInactiveItemsQuery, useDeleteItemMutation } = trashApiSlice
