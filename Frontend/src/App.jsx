import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import MainLayout from './Components/MainLayout'
import Home from './Components/Home'

function App() {
 
const BrowserRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children: [{
     path:"/",
     element:<Home
     />
    }]
    
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  }
])

  return (
    <>
  
    <RouterProvider router={BrowserRouter} />
    </>
  )
}

export default App
