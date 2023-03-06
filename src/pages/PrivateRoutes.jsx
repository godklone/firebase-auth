import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoyalty } from "../context/LoyaltyContext";

import CredentialAssign from "./profile/CredentialAsign";
import AssociateCardData from "./profile/AssociateCardData";
import TransitProfile from "./profile/TransitProfile";
import UpdateProfile from "./profile/UpdateProfile";
import LastMovement from "./profile/LastMovement";
import PersonalData from "./profile/PersonalData";
import StateAccount from "./profile/StateAccount";



const PrivateRoutes = () => {
  const { user } = useAuth();
  const { fidelizationData } = useLoyalty();
  const navigate = useNavigate();
  const affiliate = "";

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [])

  return (
    <Routes>
      <Route index element={fidelizationData ? <StateAccount /> : <CredentialAssign />} />
      <Route path="state-account">
        <Route path="personal-data" element={<PersonalData />} />
        <Route path="last-movement" element={<LastMovement />} />
      </Route>

      /************************************************************************/
      <Route path="profile" >
        <Route index element={<AssociateCardData />} />
        <Route path="associate-data/associate-transit-data"
          element={<TransitProfile affiliate={affiliate} />}
        />
        <Route path="associate-data/update-profile"
          element={<UpdateProfile disabledField={true} />}
        />
        <Route path="associate-transit-data"
          element={<TransitProfile affiliate={affiliate} />}
        />
        <Route path="state-account/last-movement" element={<LastMovement />} />
      </Route>
      /************************************************************************/
    </Routes>
  )
}

export default PrivateRoutes