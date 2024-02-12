import { useEffect, useRef, useState } from "react"
import { useElementOnScreen } from "../../shared/useElementOnScreen/useElementOnScreen"
import { $api } from "../../shared/api/api"
import Header from "../../shared/header/Header"
import { revalidateBlog } from "../../shared/api/revalidate"


const Blog = () => {

    const [blogList, setblogList] = useState<any[]>([])

    const { containerRef, isVisible } = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        treshold: 0.1
    })

    const [loadPosition, setLoadPosition] = useState(0)

    const getBlog = () => {
        $api.post('/api/blogs', {
            "count": 10,
            "loadPosition": loadPosition
        })
            .then(e => {
                setblogList(prev => [...prev, ...e.data])
                setLoadPosition(prev => prev + 10)
            })
    }

    const reset = () => {
        setLoadPosition(0)
        setblogList([])
        $api.post('/api/blogs', {
            "count": 10,
            "loadPosition": 0
        })
            .then(e => {
                setblogList(prev => [...prev, ...e.data])
                setLoadPosition(prev => prev + 10)
            })
    }

    useEffect(() => {
        getBlog()
    }, [])

    useEffect(() => {
        if (isVisible) getBlog()
    }, [isVisible])

    const [topicName, setTopicName] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [description, setDescription] = useState("")

    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }} >
                <h1>Создать статью</h1>
                <input style={{
                    maxWidth: '500px'
                }} className="input" maxLength={100} type="text" placeholder="Заголовок" value={topicName} onChange={e => {
                    setTopicName(e.target.value)
                }} />
                <input style={{
                    maxWidth: '500px',
                }} className="input" maxLength={200} type="text" placeholder="Короткое описание" value={shortDescription} onChange={e => {
                    setShortDescription(e.target.value)
                }} />
                <textarea style={{
                    maxWidth: '500px',
                    minHeight: '300px',
                    textAlign: 'start'
                }} className="input" maxLength={3000} placeholder="Текст" value={description} onChange={e => {
                    setDescription(e.target.value)
                }} />
                <button style={{
                    maxWidth: '500px'
                }} className="button" onClick={() => {
                    $api.post('/api/blog', {
                        topicName,
                        shortDescription,
                        description
                    })
                        .then(e => {
                            revalidateBlog()
                            setTopicName("")
                            setShortDescription("")
                            setDescription("")
                            reset()
                        })
                }}>Сохранить</button>
                <div style={{
                    marginInline: '80px',
                    flexDirection: 'column',
                    display: 'flex',
                    gap: '20px'
                }}>
                    {
                        blogList && blogList.map((e, index) => {
                            return <div style={{
                                backgroundColor: '#F1F1F1',
                                padding: '100px',
                                borderRadius: '20px'
                            }} ref={index == blogList.length - 1 ? containerRef : null}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <h2 style={{
                                        marginBottom: '8px',
                                        fontSize: '32px'
                                    }}>Заголовок: {e.name}</h2>
                                    <button onClick={() => {
                                        $api.delete(`/api/blog?blogId=${e.id}`)
                                        .then((ev) => {
                                            if (ev.status == 204) {
                                                revalidateBlog()
                                                reset()
                                            }
                                        })  
                                    }} style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        width: '15px',
                                        height: '15px',
                                        padding: '0px',
                                        margin: '0px'
                                    }}><img src="/exit.svg" width={15} height={15} alt="" /></button>
                                </div>
                                <h5 style={{
                                    marginBottom: '14px',
                                    fontSize: '18px'
                                }}>Краткое описание: {e.shortDescription}</h5>
                                <p style={{
                                    whiteSpace: 'pre-line'
                                }}>Статья: {e.description}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Blog
