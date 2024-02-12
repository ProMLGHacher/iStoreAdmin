import { useCallback, useEffect, useState } from "react"
import { $api } from "../../shared/api/api"
import Select from "../../shared/select/Select"
import { revalidateFilters } from "../../shared/api/revalidate"
import Header from "../../shared/header/Header"

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
    }, [getFilters, selectedCategory])


    const send = () => {
        $api.post<string[]>(`/api/deviceModel`, {
            "name": newFilter,
            "productCategoryName": selectedCategory
        }).then((_) => {
            getFilters()
            revalidateFilters()
        })
    }

    const remove = (el: string) => {
        $api.delete<string[]>(`/api/deviceModel?deviceModel=${el}`).then((_) => {
            getFilters()
            revalidateFilters()
        })
    }

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                maxWidth: '300px',
                marginInline: 'auto'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginTop: '100px',
                    marginBottom: '30px'
                }}>Создать фильтр</h1>
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
                    Boolean(categories.length) && <div style={{
                        width: '100%',
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px'
                    }}>
                        <input className="input" placeholder="Наззвание продукта" value={newFilter} onChange={(e) => {
                            setNewFilter(e.target.value)
                        }} type="text" />
                        <button className="button" onClick={send}>Создать</button>
                    </div>
                }

                {
                    Boolean(filters.length) && <div>
                        {
                            filters.map((el) => {
                                return <div style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px 80px',
                                    border: '1px solid black',
                                    width: '100%',
                                    borderRadius: '10px'
                                }} key={el}>
                                    <p style={{
                                        marginRight: '10px',
                                    }}>{el}</p>
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        height: '15px',
                                        width: '15px',
                                        cursor: 'pointer'
                                    }} onClick={() => {
                                        remove(el)
                                    }}> <img style={{
                                        height: '15px',
                                        width: '15px'
                                    }} src="exit.svg" alt="" /> </button>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default AddDeviceModelPage
