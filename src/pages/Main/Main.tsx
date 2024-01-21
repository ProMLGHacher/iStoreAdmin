import { useDispatch } from "react-redux"
import { logOut } from "../../feauters/authSlice"


export const Main = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => {
                dispatch(logOut())
            }}>log out</button>
        </div>
    )
}
