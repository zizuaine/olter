import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { Files } from './pages/files';
import { BackgroundLayout } from './layouts/background';
import { ProtectRoute } from './components/protectRoute';
import { AuthContextProvider } from './context/authContext';
import { Sidebar } from "./components/sidebar"
import { BrainContextProvider } from './context/brainContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <BrainContextProvider>
          <Routes>
            <Route element={<BackgroundLayout />}>

              <Route
                path="/auth"
                element={<Auth />}
              />

              <Route element={<ProtectRoute />}>
                <Route element={<Sidebar />}>
                  <Route
                    path="/files"
                    element={<Files />}
                  />

                  <Route
                    path="/"
                    element={<Home />}
                  />
                </Route>
              </Route>

            </Route>
          </Routes>
        </BrainContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App
