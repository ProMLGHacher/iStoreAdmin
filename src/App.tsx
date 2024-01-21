import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login/Login'
import { useAppSelector } from './app/hooks'
import { selectToken } from './feauters/authSlice'
import { Main } from './pages/Main/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }
])

const noneAuthRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  }
])

function App() {

  const accsessToken = useAppSelector(selectToken)

  return (
    accsessToken ? <RouterProvider router={router} /> : <RouterProvider router={noneAuthRouter} />
  )
}

export default App
