import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoyalty } from '../context/LoyaltyContext';

import CredentialAssign from './profile/CredentialAsign';
import TransitProfile from './profile/TransitProfile';
import UpdateProfile from './profile/UpdateProfile';
import LastMovement from './profile/LastMovement';
import PersonalData from './profile/PersonalData';
import StateAccount from './profile/StateAccount';
import Spinner from '../components/Spinner';
import { AffiliationPage } from './profile/AffiliationPage';
import MainLayout from '../layout/MainLayout';

const PrivateRoutes = () => {
  const { user, isLoading } = useAuth();
  const { fidelizationData, loadingSpinner } = useLoyalty();
  const navigate = useNavigate();
  const affiliate = '';

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  if (isLoading || loadingSpinner) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            fidelizationData !== null ? <StateAccount /> : <CredentialAssign />
          }
        />
        <Route path='state-account'>
          <Route path='personal-data' element={<PersonalData />} />
        </Route>
        <Route path='profile'>
          <Route index element={<AffiliationPage />} />
          <Route
            path='associate-data/associate-transit-data'
            element={<TransitProfile affiliate={affiliate} />}
          />
          <Route
            path='associate-data/update-profile'
            element={<UpdateProfile disabledField={true} />}
          />
          <Route
            path='associate-transit-data'
            element={<TransitProfile affiliate={affiliate} />}
          />
          {/* <Route path="state-account/last-movement" element={<LastMovement />} /> */}
        </Route>
      </Route>
      <Route path='/last-movement' element={<LastMovement />} />
    </Routes>
  );
};

export default PrivateRoutes;
