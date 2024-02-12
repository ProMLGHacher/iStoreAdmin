import { useDispatch } from "react-redux"
import { logOut } from "../../feauters/authSlice"
import styles from './Main.module.scss'
import { Link } from "react-router-dom"


export const Main = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <img src="logo.png" alt="" />
            <header style={{
                display: 'flex',
                gap: '20px',
                flexDirection: 'column',
                maxWidth: '300px',
                width: '100%'
            }}>
                <Link className="button" to={'/addDeviceModel'}>Добавить фильтры</Link>
                <Link className="button" to={'/addProduct'}>Добавить продукт</Link>
                <Link className="button" to={'/products'}>Все продукты</Link>
                <Link className="button" to={'/promo'}>Промокоды</Link>
                <Link className="button" to={'/blog'}>Блог</Link>
            </header>
            <button style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: 'black',
                opacity: '0.4',
                textDecoration: 'underline',
                fontSize: '24px',
                cursor: 'pointer'
            }} onClick={() => {
                dispatch(logOut())
            }}>Выйти</button>
        </div>
    )
}
