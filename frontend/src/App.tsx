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
import { ChatContextProvider } from './context/chatContext';
import ChatPage from './pages/chat';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>

          <Route element={<BackgroundLayout />}>

            <Route
              path="/auth"
              element={<Auth />}
            />

            <Route element={<ProtectRoute />}>
              <Route
                element={
                  <BrainContextProvider>
                    <ChatContextProvider>
                      <Sidebar />
                    </ChatContextProvider>
                  </BrainContextProvider>
                }
              >
                <Route
                  path="/files"
                  element={<Files />}
                />

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path='/chat/:chatId'
                  element={<ChatPage />}
                />
              </Route>
            </Route>

          </Route>

        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App
