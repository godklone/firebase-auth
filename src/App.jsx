import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoyaltyProvider } from './context/LoyaltyContext';

import Splash from './pages/Splash';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';
import PublicRoutes from './pages/PublicRoutes';
import PrivateRoutes from './pages/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoyaltyProvider>
            <Routes>
              <Route path="/" >
                <Route index element={<Splash />} />
                {/* <Route> */}
                  <Route path="login/*" element={<PublicRoutes />} />
                  <Route path="home/*" element={<PrivateRoutes />} />
                {/* </Route> */}
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="404" element={<NotFound />} />
              </Route>
            </Routes>
        </LoyaltyProvider>
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;