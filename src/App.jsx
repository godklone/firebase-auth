import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Splash from './pages/Splash';
import Signup from './pages/Signup';

import ForgotPasswd from './pages/ForgotPasswd';
import NavigatorMachine from './component/NavigatorMachine';
import AuthLayout from './layout/AuthLayout';
import Register from './pages/Register';
import ProtectedRoute from './layout/ProtectedRoute';
import CredentialAssign from './pages/CredentialAsign';
import StateAccount from './pages/StateAccount';
import PersonalData from './pages/PersonalData';
import LastMovement from './pages/LastMovement';

function App() {
  const { user, isLoading, profileAssignment } = useAuth();
  console.log(profileAssignment, user)
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <NavigatorMachine /> */}
        <Routes>
          <Route path="/" >
            <Route index element={<Splash />} />
          </Route>

          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<Signup />} />
            <Route path='register' element={<Register />} />
            <Route path="forgoten-password" element={<ForgotPasswd />} />
          </Route>

          {user
            &&
            <Route path="/home" element={<ProtectedRoute />}>

              {profileAssignment
                ? <Route index element={<StateAccount />} />
                : <Route index element={<CredentialAssign />} />
              }
              <Route path="state-account/personal-data" element={<PersonalData />} />
              <Route path="state-account/last-movement" element={<LastMovement />} />
              /************************************************************************/
              <Route path="profile" >
                <Route index element={<CredentialAssign />} />
                <Route path="asociate" element={<LastMovement />} />
                <Route path="state-account/personal-data" element={<PersonalData />} />
                <Route path="state-account/last-movement" element={<LastMovement />} />
              </Route>
              /************************************************************************/
            </Route>

          }

        </Routes>
      </AuthProvider>
    </BrowserRouter >


  );
}


export default App;