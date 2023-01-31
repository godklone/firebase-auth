import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Splash from './pages/Splash';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ForgotPasswd from './pages/ForgotPasswd';
import NavigatorMachine from './component/NavigatorMachine';
import AuthLayout from './layout/AuthLayout';

function App() {

  return (
    <BrowserRouter>
      <NavigatorMachine />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="/forgoten-password" element={<ForgotPasswd />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}


export default App;