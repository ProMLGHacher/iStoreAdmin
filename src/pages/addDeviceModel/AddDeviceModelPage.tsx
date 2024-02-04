import { useCallback, useEffect, useState } from "react"
import { $api } from "../../shared/api/api"
import Select from "../../shared/select/Select"

const AddDeviceModelPage = () => {

    const [categories, setCategories] = useState<{
        name: string
    }[]>([])

    const [selectedCategory, setSelectedCategory] = useState<string>()
    const [newFilter, setNewFilter] = useState("")

    useEffect(() => {
        $api.get<{
            name: string
        }[]>("/api/productCategories").then((data) => {
            setCategories(data.data)
            setSelectedCategory(data.data[0].name)
        })
    }, [])

    const [filters, setFilters] = useState<string[]>([])

    const getFilters = useCallback(() => {
        $api.get<string[]>(`/api/deviceModels?categoryName=${selectedCategory}`).then((data) => {
            setFilters(data.data)
        })
    }, [selectedCategory])

    useEffect(() => {
        getFilters()
    }, [selectedCategory])


    const send = () => {
        $api.post<string[]>(`/api/deviceModel`, {
            "name": newFilter,
            "productCategoryName": selectedCategory
        }).then((data) => {
            getFilters()
        })
    }

    const remove = (el: string) => {
        $api.delete<string[]>(`/api/deviceModel?deviceModel=${el}`).then((data) => {
            getFilters()
        })
    }

    return (
        <>
            {
                Boolean(categories.length) && <Select onChange={(value) => {
                    setSelectedCategory(value)
                }} values={categories.map(el => {
                    return {
                        value: el.name,
                        name: el.name
                    }
                })} />
            }
            {
                Boolean(filters.length) && <div>
                    {
                        filters.map((el) => {
                            return <div style={{
                                display: 'flex'
                            }} key={el}>
                                <p>{el}</p>
                                <button onClick={() => {
                                    remove(el)
                                }}>del</button>
                            </div>
                        })
                    }
                </div>
            }
            {
                Boolean(categories.length) && <div>
                <input value={newFilter} onChange={(e) => {
                    setNewFilter(e.target.value)
                }} type="text" />
                <button onClick={send}>send</button>
            </div>
            }
        </>
    )
}

export default AddDeviceModelPage
