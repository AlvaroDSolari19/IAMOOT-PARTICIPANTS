import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import RequestPassword from './pages/RequestPassword';
import SetPassword from './pages/SetPassword';
import Upload from './pages/Upload';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LanguageSelection />} />
          <Route path='/login' element={<Login />} />
          <Route path='/request-password' element={<RequestPassword />} />
          <Route path='/set-password' element={<SetPassword />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App; 