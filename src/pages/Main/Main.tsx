import { useDispatch } from "react-redux"
import { logOut } from "../../feauters/authSlice"
import Product from "../../feauters/product/Product"
import { Link } from "react-router-dom"


export const Main = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <header style={{
                display: 'flex'
            }}>
                <Link to={'/addDeviceModel'}>Фильтры</Link>
                <Link to={'/addProduct'}>addProduct</Link>
                <Link to={'/products'}>products</Link>
            </header>
            <button onClick={() => {
                dispatch(logOut())
            }}>log out</button>
        </div>
    )
}
