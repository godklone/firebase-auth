import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavigatorMachine from './component/NavigatorMachine';

import Splash from './pages/Splash';
import Signup from './pages/Signup';
import ForgotPasswd from './pages/ForgotPasswd';
import MainLayout from './layout/MainLayout';
import Register from './pages/Register';
import CredentialAssign from './pages/CredentialAsign';
import StateAccount from './pages/StateAccount';
import PersonalData from './pages/PersonalData';
import LastMovement from './pages/LastMovement';
import AssociateCardData from './pages/AssociateCardData';
import AssociateTransitProfile from './pages/AssociateTransitProfile';
import ContinueProfile from './pages/ContinueProfile';

function App() {
  const { user, isLoading, profileAssignment, affiliate, token } = useAuth();

  // que deberia hacer si no existeste un webHook hacia la pagina

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <NavigatorMachine /> */}
        <Routes>
          <Route path="/" >
            <Route index element={<Splash />} />

            <Route path="/login" element={<MainLayout />}>
              <Route index element={<Signup />} />
              <Route path='register' element={<Register />} />
              <Route path="forgoten-password" element={<ForgotPasswd />} />
            </Route>
            {
              user &&
              <Route path="/home" element={<MainLayout />}>
                {
                  profileAssignment
                    ? <Route index element={<StateAccount />} />
                    : <Route index element={<CredentialAssign />} />
                }
                <Route path="state-account">
                  <Route path="personal-data" element={<PersonalData />} />
                  <Route path="last-movement" element={<LastMovement />} />
                </Route>

              /************************************************************************/
                <Route path="profile" >
                  <Route index element={<AssociateCardData />} />
                  <Route path="associate-data/associate-transit-data"
                    element={<AssociateTransitProfile affiliate={affiliate} />}
                  />
                  <Route path="associate-data/continue-profile"
                    element={<ContinueProfile />}
                  />
                  <Route path="associate-transit-data"
                    element={<AssociateTransitProfile affiliate={affiliate} />}
                  />
                  <Route path="state-account/last-movement" element={<LastMovement />} />
                </Route>
              /************************************************************************/
              </Route>
            }
            <Route path="/*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >


  );
}


export default App;