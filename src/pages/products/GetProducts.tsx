import { useState, useEffect } from "react"
import { $api } from "../../shared/api/api"
import Select from "../../shared/select/Select"
import { Product } from "./types"
import ProductView from "../../feauters/product/Product"

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

    const update = async () => {
        $api.get('/api/products?deviceModel=' + selectedCategory)
            .then((data) => {
                setProducts(data.data)
            })
    }

    useEffect(() => {
        update()
    }, [selectedCategory])


    return (
        <div>
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
                products.map((el) => {
                    return <ProductView key={el.productId} product={el} />
                })
            }
        </div>
    )
}

export default GetProducts
