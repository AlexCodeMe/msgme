import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center bg-indigo-800'>
      <Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
      <Toaster />
    </div>
  )
}

export default App
