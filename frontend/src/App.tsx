import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { BackgroundLayout } from './layouts/background';
import { ProtectRoute } from './components/protectRoute';
import { AuthContextProvider } from './context/authContext';
import { Sidebar } from 'lucide-react';

function App() {

  return (
    <>
      <BrowserRouter>

        <AuthContextProvider>
          <Routes>
            <Route element={<BackgroundLayout />}>
              <Route path='/auth' element={<Auth />} />

              <Route element={<ProtectRoute />}>
                <Route element={<Sidebar />}>
                  <Route path="/" element={<Home />} />
                </Route>
              </Route>

            </Route>
          </Routes>
        </AuthContextProvider>

      </BrowserRouter >
    </>
  )
}

export default App
