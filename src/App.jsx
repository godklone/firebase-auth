import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import NavigatorMachine from './components/NavigatorMachine';

import Splash from './pages/Splash';
import MainLayout from './layout/MainLayout';
import PublicRoutes from './pages/PublicRoutes';
import PrivateRoutes from './pages/PrivateRoutes';
import NotFound from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" >
            <Route index element={<Splash />} />

            <Route element={<MainLayout />}>
              <Route path="login/*" element={<PublicRoutes />} />
              <Route path="home/*" element={<PrivateRoutes />} />
            </Route>
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="404" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >

  );
}


export default App;