import { Routes, Route} from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import ForgotPasswd from './auth/ForgotPasswd';
import Register from './auth/Register';
import Signup from './auth/Signup';

const PublicRoutes = () => {
  const { webHook } = useAuth();
  return (
    <Routes>
      {/* {!webHook ? (
        <Route path='/404' />
      ) : (
        <> */}
          <Route index element={<AnimatedPage><Signup /></AnimatedPage>} />
          <Route path='register' element={<Register />} />
          <Route path='forgoten-password' element={<ForgotPasswd />} />
        {/* </>
      )} */}
    </Routes>
  );
};

export default PublicRoutes;
