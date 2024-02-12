import { useEffect, useState } from "react"
import { $api } from "../../shared/api/api"
import Select from "../../shared/select/Select"
import Header from "../../shared/header/Header"


export const Promocode = () => {

    const [promos, setPromos] = useState<undefined | {
        "type": 'DiscountAmount' | "DiscountPercentage",
        "code": string,
        "value": number,
        "dateExpiration": string
    }[]>()


    const getPromos = () => {
        $api.get('/api/promocodes')
            .then(data => {
                setPromos(data.data)
            })
    }

    useEffect(() => {
        getPromos()
    }, [])


    const [promoType, setpromoType] = useState("DiscountAmount")
    const [value, setValue] = useState(NaN)
    const [countDays, setCountDays] = useState(NaN)

    return (
        <>
            <Header />
            <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            maxWidth: '300px',
            marginInline: 'auto',
            gap: '20px',
            marginTop: '100px'
        }}>
            <Select values={[
                {
                    name: "Рубли",
                    value: 'DiscountAmount'
                },
                {
                    name: "Проценты",
                    value: 'DiscountPercentage'
                },
            ]}
                onChange={(e) => {
                    setpromoType(e)
                }}
            />
            <input className="input" type="number" placeholder="Значение" value={value} onChange={(e) => {
                setValue(parseFloat(e.target.value))
            }} />
            <input className="input" type="number" placeholder="Количество времени" value={countDays} onChange={(e) => {
                setCountDays(parseFloat(e.target.value))
            }} />
            <button className="button" onClick={() => {
                $api.post('/api/promocode', {
                    "type": promoType,
                    "value": value,
                    "countDays": countDays
                })
                    .then(e => {
                        if (e.status == 200) {
                            getPromos()
                        }
                    })
            }}>Создать</button>
            {
                promos && promos.map(e => {
                    return <div style={{
                        backgroundColor: 'black',
                        borderRadius: '10px',
                        color: 'white',
                        width: '100%',
                        padding: '20px'
                    }}>
                        <p>Код: {e.code}</p>
                        <p>Активен до: {new Date(e.dateExpiration).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}</p>
                        <p>Значение: {e.value}{e.type == 'DiscountAmount' ? '₽' : "%"}</p>
                    </div>
                })
            }
        </div>
        </>
    )
}
