import React, { useEffect, useState } from 'react'
import { $api } from '../../shared/api/api'
import Header from '../../shared/header/Header'

const Stats = () => {

  const [stats, setStats] = useState<{
    "averageSum": number,
    "countPurchasedGoods": number,
    "minCostProduct": number,
    "maxCostProduct": number,
    "productAnalytics": {
      "name": string,
      "count": number,
      "images": string[]
    }[]
  }>()

  useEffect(() => {
    $api.post('/api/analytic')
      .then((e) => {
        if (e.status == 200) {
          setStats(e.data)
        }
      })
  }, [])


  return (
    <>
      <Header />
      <h1 style={{
        textAlign: 'center'
      }}>Аналитика</h1>
      <div style={{
        marginInline: 'auto',
        width: '90%',
        marginTop: '40px'
      }}>
        <Stat text={`Всего заказов: ${stats?.averageSum}`} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <Stat text={`Максимальная стоимость: ${stats?.maxCostProduct} Руб`} />
          <Stat text={`Средний чек: ${stats?.averageSum} Руб`} />
          <Stat text={`Минимальная стоимость: ${stats?.minCostProduct} Руб`} />
        </div>
      </div>

      <h1 style={{
        textAlign: 'center',
        marginTop: '40px'
      }}>Рейтинг</h1>
      <div style={{
        marginInline: 'auto',
        width: '90%',
        marginTop: '40px',
      }}>
        {
          stats?.productAnalytics.map(e => {
            return <Stat text={`${e.name} - ${e.count} штук`} />
          })
        }
      </div>
    </>
  )
}

const Stat = (props: {
  text: string
}) => {
  return (
    <div style={{
      textAlign: 'center',
      border: '1px solid black',
      padding: '18px',
      opacity: '0.6',
      borderRadius: '10px'
    }}>
      {props.text}
    </div>
  )
}


export default Stats
