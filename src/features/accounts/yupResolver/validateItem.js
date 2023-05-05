import * as Yup from "yup"

const validateItem = Yup.object().shape({
    name: Yup.string().required("name is required"),
    price: Yup.number()
        .min(0, "must be greater than -1")
        .nullable(true)
        .transform((_, value) => (value !== "" ? Number(value) : 0)),
    quantity: Yup.number()
        .integer("must be an integer")
        .transform((_, value) => (value !== "" ? Number(value) : 0)),
})

export default validateItem
