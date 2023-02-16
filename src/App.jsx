import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavigatorMachine from './components/NavigatorMachine';

import Splash from './pages/Splash';
import MainLayout from './layout/MainLayout';
import PublicRoutes from './pages/PublicRoutes';
import PrivateRoutes from './pages/PrivateRoutes';
import NotFound from './pages/NotFound';

function App() {
  const { splash, webHook } = useAuth();
  // que deberia hacer si no existeste un webHook hacia la pagina
  console.log("webhook", webHook)
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <NavigatorMachine /> */}
        <Routes>
          <Route path="/" >
            <Route index element={<Splash />} />

            <Route element={<MainLayout />}>
              <Route path="/login/*" element={<PublicRoutes />} />
              <Route path="/home/*" element={<PrivateRoutes />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </BrowserRouter >
    </AuthProvider>
  );
}


export default App;