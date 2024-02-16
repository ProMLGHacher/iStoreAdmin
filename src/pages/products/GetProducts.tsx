import { useState, useEffect, useCallback } from "react"
import { $api } from "../../shared/api/api"
import Select from "../../shared/select/Select"
import { Product } from "./types"
import ProductView from "../../feauters/product/Product"
import Header from "../../shared/header/Header"
import { useNavigate, useParams } from "react-router-dom"

const GetProducts = () => {

    const { filter } = useParams()

    const [categories, setCategories] = useState<{
        name: string
    }[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>()

    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        if (!filter) {
            navigate('/')
            return
        }
        const get = async () => {
            await $api.get<{
                name: string
            }[]>("/api/productCategories").then((data) => {
                if (!data.data.map(e => e.name).includes(filter)) {
                    navigate('/')
                }
                setCategories(data.data)
                setSelectedCategory(filter)
            })
        }
        get()
    }, [filter])

    useEffect(() => {
        if (selectedCategory) $api.get('/api/products?deviceModel=' + selectedCategory)
            .then((data) => {
                setProducts(data.data)
            })
    }, [selectedCategory])





    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px  '
            }}>
                {
                    Boolean(categories.length) && <Select value={selectedCategory} onChange={(value) => {
                        navigate('/products/' + value)
                    }} values={categories.map(el => {
                        return {
                            value: el.name,
                            name: el.name
                        }
                    })} />
                }
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '100%'
                }}>
                    {
                        products.map((el) => {
                            return <ProductView update={() => {
                                if (selectedCategory) $api.get('/api/products?deviceModel=' + selectedCategory)
                                    .then((data) => {
                                        setProducts(data.data)
                                    })
                            }} key={el.productId} product={el} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default GetProducts
