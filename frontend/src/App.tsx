import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/auth-context'

function App() {
  const { authUser, isLoading } = useAuthContext()
	if (isLoading) return null

  return (
    <div className='p-4 h-screen flex items-center justify-center bg-indigo-800'>
      <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/register' element={!authUser ? <Register /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
			</Routes>
      <Toaster />
    </div>
  )
}

export default App
