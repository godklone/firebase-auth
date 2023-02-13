import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AssociateCardData from "./AssociateCardData";
import AssociateTransitProfile from "./AssociateTransitProfile";
import ContinueProfile from "./ContinueProfile";
import CredentialAssign from "./CredentialAsign";
import LastMovement from "./LastMovement";
import PersonalData from "./PersonalData";
import StateAccount from "./StateAccount";

const PrivateRoutes = () => {
  const { user, isLoading, profileAssignment, affiliate, token } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if (!user) {
      navigate("/");
    }
  },
  [])
 
  return (
    <Routes>
      <Route index element={profileAssignment ? <StateAccount /> : <CredentialAssign />} />

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
    </Routes>
  )
}

export default PrivateRoutes