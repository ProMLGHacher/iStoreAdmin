
import { Product } from '../../pages/products/types';
import { $api } from '../../shared/api/api';
import { useContainerDimensions } from '../../shared/api/hooks/useContainerDimentions';
import styles from './Product.module.scss'
import { useEffect, useRef, useState } from 'react';

const ProductView = (
    {
        product
    }: {
        product: Product
    }
) => {

    const update = () => { 
        window.location.reload()
    }

    const [productState, setproductState] = useState(() => {
        product.filters = product.filters.map(el => {
            el.selected = 0
            return el
        })
        return product
    })





    const [imgList, setImgList] = useState<string[]>(() => {
        const color = productState.filters.find(el => el.type == 'Color')
        if (!color) return []
        return color.elems[color.selected].values
    })

    const [selectedConfig, setSelectedConfig] = useState(() => {
        for (let index = 0; index < productState.productConfigurations.length; index++) {
            const productConf = productState.productConfigurations[index];
            const res = []
            for (let charind = 0; charind < productConf.characteristics.length; charind++) {
                const char = productConf.characteristics[charind];
                for (let filterIndex = 0; filterIndex < productState.filters.length; filterIndex++) {
                    const filter = productState.filters[filterIndex];
                    const selected = filter.elems[filter.selected]

                    if (filter.type != char.type) continue
                    if (filter.name != char.name) continue
                    if (filter.type == 'Color') {
                        if (selected.color != char.value) continue
                    }
                    if (filter.type == 'Text') {
                        if (selected.values[0] != char.value) continue
                    }
                    res.push(true)
                }
            }
            if (res.length == productConf.characteristics.length) {
                return {
                    productConf,
                    setPrice: (price: number, prodid: string) => { }
                }
            }
        }
    })

    const [price, setPrice] = useState(selectedConfig?.productConf.totalPrice)

    useEffect(() => {
        setPrice(selectedConfig?.productConf.totalPrice)
        console.log(selectedConfig);

    }, [selectedConfig])

    useEffect(() => {
        for (let index = 0; index < productState.productConfigurations.length; index++) {
            const productConf = productState.productConfigurations[index];
            const res = []
            for (let charind = 0; charind < productConf.characteristics.length; charind++) {
                const char = productConf.characteristics[charind];
                for (let filterIndex = 0; filterIndex < productState.filters.length; filterIndex++) {
                    const filter = productState.filters[filterIndex];
                    const selected = filter.elems[filter.selected]

                    if (filter.type != char.type) continue
                    if (filter.name != char.name) continue
                    if (filter.type == 'Color') {
                        if (selected.color != char.value) continue
                    }
                    if (filter.type == 'Text') {
                        if (selected.values[0] != char.value) continue
                    }
                    res.push(true)
                }
            }
            if (res.length == productConf.characteristics.length) {
                setSelectedConfig({
                    productConf,
                    setPrice: async (priceNum: number, prodid: string) => {
                        setproductState(prev => {
                            const dt = JSON.parse(JSON.stringify(prev))
                            dt.productConfigurations[index].totalPrice = priceNum
                            return dt
                        })

                        setSelectedConfig(prev => {
                            const prv = JSON.parse(JSON.stringify(prev))
                            prv.productConf.totalPrice = priceNum
                            return prv
                        })

                        console.log(priceNum);



                        await $api.patch('/api/product-configuration', {
                            "configurationId": prodid,
                            "price": priceNum
                        })
                    }
                })
                return
            }
        }
    }, [productState])

    useEffect(() => {
        setImgList((_) => {
            const color = productState.filters.find(el => el.type == 'Color')
            if (!color) return []
            return color.elems[color.selected].values
        })
    }, [productState])



    const images = useRef<null | HTMLDivElement>(null)
    const [carousel, setCarousel] = useState(0)
    const { width: imageWidth } = useContainerDimensions(images)


    const [newName, setNewName] = useState(productState.name)
    const [newDesc, setNewDesc] = useState(productState.description)

    const updateProduct = () => {
        $api.put('/api/product', {
            "id": productState.productId,
            "name": newName,
            "description": newDesc
        })
    }

    const [files, setFiles] = useState<File[]>([])

    const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        setFiles([...e.target.files])
    }

    const [color, setColor] = useState('#000000')
    const [colorName, setColorName] = useState('Белый')


    const addImgs = async () => {
        const data = new FormData()
        data.append("productId", product.productId)
        data.append("hex", color.slice(1, color.length))
        data.append("color", colorName)
        files.forEach(e => {
            data.append("formFiles", e)
        })
        
        $api.post('/api/upload/productIcon', data).then(e => {
            if (e.status == 200) {
                update()
                setFiles([])
            }
        })
    }


    return (
        <div className={styles.wrapper}>
            <button onClick={() => {
                update()
            }}>iuhuosdihfpuo</button>
            <div style={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                gap: '20px'
            }}>
                <div className={styles.carousel}>
                    <button onClick={() => {
                        if (Boolean(!imgList.length)) return
                        if (carousel == 0) {
                            setCarousel(imgList.length - 1)
                            return
                        }
                        setCarousel(prev => --prev)
                    }} className={`${styles.arrow} tap`}><img src={'/Arrow-up.svg'} width={30} height={30} alt='стреклка' /></button>
                    <div ref={images} className={styles.imagesWrapper}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            addImgs()
                        }} className={styles.imagesSettings}>
                            <input multiple onChange={fileHandler} type="file" name="file" id="file" className={styles.inputfile} />
                            <label htmlFor="file"></label>
                            {
                                Boolean(files?.length) && <div>
                                    <input value={color} onChange={(e) => {
                                        setColor(e.target.value)
                                        console.log(color);
                                    }} type="color" />
                                    <input value={colorName} onChange={(e) => {
                                        setColorName(e.target.value)
                                        console.log(colorName);
                                    }} type="text" />
                                </div>
                            }
                            <button type='button' onClick={(e) => {
                                e.preventDefault()
                                const data = new FormData()
                                data.append("productId", product.productId)
                                data.append("filename", imgList[carousel].split('/')[imgList[carousel].split('/').length-1])
                                $api.delete(`/api/upload/productIcon`, {
                                    data: data,
                                    headers: {
                                        "Content-Type" : 'multipart/form-data'
                                    }
                                })  
                                    .then(e => {
                                        if (e.status == 204) {
                                            update()
                                        }
                                    })
                            }}>c</button>
                        </form>
                        <div className={styles.images} style={{
                            // +20 потому что gap
                            transform: `translateX(-${(imageWidth + 20) * carousel}px)`
                        }}>
                            {
                                imgList.map((img) => {
                                    return <img key={img} width={imageWidth} src={img} alt="" />
                                })
                            }
                            {
                                Boolean(!imgList.length) && <img width={imageWidth} src={'/template.png'} alt="нет фото" />
                            }
                        </div>
                    </div>
                    <button onClick={() => {
                        if (!images.current) return
                        if (Boolean(!imgList.length)) return
                        if (carousel == imgList.length - 1) {
                            setCarousel(0)
                            return
                        }
                        setCarousel(prev => ++prev)
                    }} className={styles.arrowRight}><img src={'/Arrow-up.svg'} width={30} height={30} alt='стреклка' /></button>
                </div>
                <div className={styles.dots}>
                    {
                        imgList.map((index, ind) => <div key={index} className={`${ind == carousel ? styles.active : ''}`}></div>)
                    }
                </div>
            </div>
            <div className={styles.main}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    updateProduct()
                }}>
                    <input onBlur={(_) => {
                        updateProduct()
                    }} className={styles.name} defaultValue={product.name} onChange={(e) => {
                        setNewName(e.target.value)
                    }} />
                </form>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    updateProduct()
                }}>
                    <textarea
                        value={newDesc}
                        onChange={(e) => {
                            setNewDesc(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.code == "Enter" && e.shiftKey == false) {
                                e.preventDefault();
                                updateProduct()
                            }
                        }}
                        onBlur={() => {
                            updateProduct()
                        }}
                        className={styles.desc} />
                </form>
                <div className={styles.configuraion}>
                    {
                        productState.filters.map((filter, filterIndex) => {
                            return filter.type == "Text" ?
                                <div key={filter.name}>
                                    <p>{filter.name}</p>
                                    <div className={styles.filters}>
                                        {
                                            filter.elems.map((elem, elemIndex) => {
                                                return <button onClick={() => {
                                                    if (filter.selected == elemIndex) return
                                                    setproductState(prev => {
                                                        const newF = JSON.parse(JSON.stringify(prev))
                                                        newF.filters[filterIndex].selected = elemIndex
                                                        return newF
                                                    })
                                                }} key={elem.values[0]} className={`${styles.filter} ${filter.selected == elemIndex ? styles.selected : ""}`}>{elem.values[0]}</button>
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                filter.elems.filter(fil => fil.color).length != 1 && <div key={filter.name}>
                                    <p>Цвет:</p>
                                    <div className={styles.colorFilters}>
                                        {
                                            filter.elems.map((elem, elemIndex) => {
                                                return <button onClick={() => {
                                                    if (filter.selected == elemIndex) return
                                                    setproductState(prev => {
                                                        const newF = JSON.parse(JSON.stringify(prev))
                                                        newF.filters[filterIndex].selected = elemIndex
                                                        return newF
                                                    })
                                                }} key={filter.name + elem.color} style={{
                                                    backgroundColor: "#" + elem.hex
                                                }} className={`${styles.colorFilter} ${filter.selected == elemIndex ? styles.selected : ""}`}><img className={styles.rollingStick} src={'/rollingStick.svg'} alt='rollingStick' width={13} height={9} /></button>
                                            })
                                        }
                                    </div>
                                </div>
                        })
                    }
                </div>
                <div className={styles.price}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        selectedConfig?.setPrice(price!!, selectedConfig.productConf.configurationId)
                    }}>
                        <input type="number" value={price} onChange={(e) => {
                            setPrice(+e.target.value)
                        }} onBlur={(e) => {
                            selectedConfig?.setPrice(price!!, selectedConfig.productConf.configurationId)
                        }} /><p>₽</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductView