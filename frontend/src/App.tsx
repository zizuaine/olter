import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { BackgroundLayout } from './layouts/background';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BackgroundLayout />}>
            <Route path="/" element={<Home />} />
            <Route path='/auth' element={<Auth />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
