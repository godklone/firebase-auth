import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavigatorMachine from './components/NavigatorMachine';

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
              <Route path="/login/*" element={<PublicRoutes />} />
              <Route path="/home/*" element={<PrivateRoutes />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >


  );
}


export default App;