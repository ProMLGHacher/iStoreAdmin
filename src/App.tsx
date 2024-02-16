import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login/Login'
import { useAppSelector } from './app/hooks'
import { selectLogged, selectToken } from './feauters/authSlice'
import { Main } from './pages/Main/Main'
import AddDeviceModelPage from './pages/addDeviceModel/AddDeviceModelPage'
import AddProduct from './pages/products/AddProduct'
import GetProducts from './pages/products/GetProducts'
import { Promocode } from './pages/promo/Promocode'
import Blog from './pages/blog/Blog'
import Stats from './pages/stats/Stats'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path:'/addDeviceModel',
    element: <AddDeviceModelPage />
  },
  {
    path:'/addProduct',
    element: <AddProduct />
  },
  {
    path:'/products',
    element: <GetProducts />,
  },
  {
    path:'/products/:filter',
    element: <GetProducts />,
  },
  {
    path:'/promo',
    element: <Promocode />
  },
  {
    path:'/blog',
    element: <Blog />
  },
  {
    path:'/stats',
    element: <Stats />
  }
])

const noneAuthRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path:'/addDeviceModel',
    element: <Navigate to={'/'} />
  },
  {
    path:'/addProduct',
    element: <Navigate to={'/'} />
  },
  {
    path:'/products',
    element: <Navigate to={'/'} />
  },
  {
    path:'/promo',
    element: <Navigate to={'/'} />
  },
  {
    path:'/blog',
    element: <Navigate to={'/'} />
  }
])

function App() {

  const logged = useAppSelector(selectLogged)

  return (
    logged ? <RouterProvider router={router} /> : <RouterProvider router={noneAuthRouter} />
  )
}

export default App
