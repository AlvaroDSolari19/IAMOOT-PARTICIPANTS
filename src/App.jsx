import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import CreatePassword from './pages/CreatePassword';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <a href="/">Language</a> |{' '}
        <a href="/login">Login</a> |{' '}
        <a href="/reset-password">Reset</a> |{' '}
        <a href="/create-password">Create Password</a> |{' '}
        <a href="/upload">Upload</a> |{' '}
      </nav>
      <Routes>
        <Route path='/' element={<LanguageSelection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/create-password' element={<CreatePassword />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App; 