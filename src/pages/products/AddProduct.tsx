import { useEffect, useState } from "react"
import Select from "../../shared/select/Select"
import { $api } from "../../shared/api/api"
import { revalidateProducts } from "../../shared/api/revalidate"

const AddProduct = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [modelName, setModelName] = useState("")

    const [filters, setFilters] = useState<string[]>()

    useEffect(() => {
        $api.get('/api/deviceModels')
            .then((data) => {
                setModelName(data.data[0])
                setFilters(data.data)
            })
    }, [])

    const create = () => {
        $api.post('/api/product', {
            "name": name,
            "description": description,
            "modelName": modelName
        })
        .then(e => {
            if (e.status == 204) {
                revalidateProducts()
            }
            if (e.status == 200) {
                revalidateProducts()
            }
        })
    }

    return (
        <div>
            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }} type="text" />
            <input value={description} onChange={(e) => {
                setDescription(e.target.value)
            }} type="text" />
            {
                filters && <Select onChange={(value) => {
                    setModelName(value)
                }} values={filters.map(el => {
                    return {
                        value: el,
                        name: el
                    }
                })} />
            }
            <button onClick={create}>create</button>
        </div>
    )
}

export default AddProduct
