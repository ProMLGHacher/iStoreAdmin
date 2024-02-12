import { useState, useEffect, useCallback } from "react"
import { $api } from "../../shared/api/api"
import Select from "../../shared/select/Select"
import { Product } from "./types"
import ProductView from "../../feauters/product/Product"
import Header from "../../shared/header/Header"

const GetProducts = () => {

    const [categories, setCategories] = useState<{
        name: string
    }[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>()

    useEffect(() => {
        $api.get<{
            name: string
        }[]>("/api/productCategories").then((data) => {
            setCategories(data.data)
            setSelectedCategory(data.data[0].name)
        })
    }, [])


    const [products, setProducts] = useState<Product[]>([])

    const update = useCallback(async () => {
        $api.get('/api/products?deviceModel=' + selectedCategory)
            .then((data) => {
                setProducts(data.data)
            })
    }, [selectedCategory])

    useEffect(() => {
        update()
    }, [update])


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
                    Boolean(categories.length) && <Select onChange={(value) => {
                        setSelectedCategory(value)
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
                            return <ProductView key={el.productId} product={el} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default GetProducts
