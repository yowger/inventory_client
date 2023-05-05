import format from "date-fns/format"
import { apiSlice } from "../../app/api/apiSlice"

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            method: "GET",
            query: () => ({
                url: `/stats`,
            }),
            transformResponse: (responseData) => {
                // NEEDS REDO in both server and here, will update in time
                let totalAmount = 0
                let totalQuantity = 0

                const transformCategory = responseData?.stats?.category.map(
                    (category) => {
                        category.name = category._id
                        const { _id, ...rest } = category

                        return rest
                    }
                )

                const totalCategories = responseData?.stats?.category.length

                const transformAmount = responseData?.stats?.amount.map(
                    (amount) => {
                        amount.name = amount._id
                        const { _id, ...rest } = amount

                        return rest
                    }
                )

                const transformAmountByWeek =
                    responseData?.stats?.amountByWeek.map((amount) => {
                        const formattedDate = format(
                            new Date(amount.createdAt),
                            "MM/dd/yyyy"
                        )

                        totalAmount = totalAmount + amount.amount
                        amount.name = formattedDate
                        amount.amount = totalAmount

                        const { _id, ...rest } = amount

                        return rest
                    })

                const finalAmount =
                    responseData?.stats?.amountByWeek.slice(-1)[0].amount

                const transformQuantityByWeek =
                    responseData?.stats?.quantityByWeek.map((quantity) => {
                        const formattedDate = format(
                            new Date(quantity.createdAt),
                            "MM/dd/yyyy"
                        )

                        totalQuantity = totalQuantity + quantity.quantity
                        quantity.name = formattedDate
                        quantity.quantity = totalQuantity

                        const { _id, ...rest } = quantity

                        return rest
                    })

                const finalQuantity =
                    responseData?.stats?.quantityByWeek.slice(-1)[0].quantity

                return {
                    totalCategories,
                    finalAmount,
                    finalQuantity,
                    category: transformCategory,
                    amount: transformAmount,
                    amountByWeek: transformAmountByWeek,
                    quantityByWeek: transformQuantityByWeek,
                }
            },
        }),
    }),
})

export const { useGetStatsQuery } = dashboardApiSlice
