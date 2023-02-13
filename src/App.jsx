import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavigatorMachine from './components/NavigatorMachine';

import Splash from './pages/Splash';
import MainLayout from './layout/MainLayout';
import PublicRoutes from './pages/PublicRoutes';
import PrivateRoutes from './pages/PrivateRoutes';

function App() {

  // que deberia hacer si no existeste un webHook hacia la pagina

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <NavigatorMachine /> */}
        <Routes>
          <Route path="/" >
            <Route index element={<Splash />} />
            <Route element={<MainLayout />}>
              <Route path="/login/*" element={<PublicRoutes />} />
              <Route path="/home/*" element={<PrivateRoutes />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
}


export default App;