import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoyaltyProvider } from './context/LoyaltyContext';

const Splash = lazy(() => import('./pages/Splash'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PublicRoutes = lazy(() => import('./pages/PublicRoutes'));
const PrivateRoutes = lazy(() => import('./pages/PrivateRoutes'));
// import Splash from './pages/Splash';
// import NotFound from './pages/NotFound';
// import PublicRoutes from './pages/PublicRoutes';
// import PrivateRoutes from './pages/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoyaltyProvider>
          {/* <Suspense fallback={<Splash />}> */}
            <Routes>
              <Route path="/" >
                <Route index element={<Splash />} />
                <Route path="login/*" element={<PublicRoutes />} />
                <Route path="home/*" element={<PrivateRoutes />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="404" element={<NotFound />} />
              </Route>
            </Routes>
          {/* </Suspense> */}
        </LoyaltyProvider>
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;