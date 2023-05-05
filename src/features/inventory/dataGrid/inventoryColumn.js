import React from "react"
import Highlighter from "react-highlight-words"
import clsx from "clsx"

const inventoryColumn = ({ highlightedWord = "" }) => {
    return [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            minWidth: 220,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 220,
            renderCell: (params) => {
                if (highlightedWord?.name) {
                    return (
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[highlightedWord?.name]}
                            autoEscape={true}
                            textToHighlight={params.row.name}
                        />
                    )
                } else return
            },
        },
        {
            field: "tags",
            headerName: "Category",
            flex: 1,
            minWidth: 70,
            renderCell: (params) => {
                if (highlightedWord?.category) {
                    return (
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={highlightedWord?.category}
                            autoEscape={true}
                            textToHighlight={params.row.tags}
                        />
                    )
                } else return
            },
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            flex: 0.7,
            maxWidth: 150,
            renderCell: (params) => `$ ${params.row.price}`,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            type: "number",
            flex: 0.7,
            minWidth: 150,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            flex: 0.8,
            minWidth: 150,
            renderCell: (params) => `$ ${params.row.total}`,
            cellClassName: (params) => {
                const total = params.row.price * params.row.quantity

                return clsx("total", {
                    negative: total < 0,
                    positive: total > 0,
                })
            },
        },
        {
            field: "createdAt",
            headerName: "Created at",
            // type: "dateTime",
            flex: 0.7,
            minWidth: 120,
        },
        {
            field: "updatedAt",
            headerName: "Updated at",
            // type: "dateTime",
            flex: 0.7,
            minWidth: 120,
            visible: false,
        },
    ]
}

export default inventoryColumn
