import { useEffect, useState } from "react"
import Select from "../../shared/select/Select"
import { $api } from "../../shared/api/api"
import { revalidateProducts } from "../../shared/api/revalidate"
import Header from "../../shared/header/Header"

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
                if (e.status < 299) {
                    revalidateProducts()
                    setName('')
                    setDescription('')
                    alert('Успешно')
                }
            })
    }

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '90dvh',
                gap: '16px',
                maxWidth: '300px',
                marginInline: 'auto'
            }}>
                <h1>Создать Продукт</h1>
                <input className="input" value={name} placeholder="Название продукта" onChange={(e) => {
                    setName(e.target.value)
                }} type="text" />
                <textarea className="input" style={{

                }} placeholder="Описание продукта" value={description} onChange={(e) => {
                    setDescription(e.target.value)
                }} />
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
                <button className="button" onClick={create}>Создать</button>
            </div>
        </>
    )
}

export default AddProduct
