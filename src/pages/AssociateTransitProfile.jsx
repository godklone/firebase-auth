import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../component/Profile";

const AssociateTransitProfile = (props) => {
  const navigate = useNavigate();
  const dniRef = useRef();
  const namesRef = useRef();
  const lastNameRef = useRef();

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log("Confirmando datos")
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1)
    console.log("Cancelar accion")
  }

  return (
    <Profile title={"Perfil en transito"} />
  )
}

export default AssociateTransitProfile