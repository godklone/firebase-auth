import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoyalty } from "../../context/LoyaltyContext";

import { BiLogOut } from "react-icons/bi";
import css from "../../assets/styles/pages/stateAccount.module.scss";
import { startTransition, useEffect, useState } from "react";

const StateAccount = () => {
  const { webHook, getPhotoUrl, logout, token } = useAuth();
  const [webToken, setWebToken] = useState(null);

  const navigate = useNavigate();
  const {
    getLastMovements,
    setFidelizationData,
    fidelizationData,
    setLoadingSpinner,
    setTransitProfile,
  } = useLoyalty();

  const {
    fullName,
    fidelization: {
      accumulatedPoints,
      expirationPoints,
      expirationDate,
      credencial,
    },
  } = fidelizationData;

  useEffect(() => {
    const calculatedWebToken = webHook ? `${webHook}?token=${token}` : "";
    setWebToken(calculatedWebToken);
  }, [token]);

  const handlePersonalData = (e) => {
    e.preventDefault();
    navigate("state-account/personal-data");
  };

  const handleLastMovement = async (e) => {
    e.preventDefault();
    await getLastMovements();
    navigate("last-movement");
  };

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   setLoadingSpinner(true);
  //   setFidelizationData(null);
  //   setTransitProfile(null);
  //   await logout();
  //   startTransition(() => {
  //     navigate(`/ ${webHook}? "?webhook="${webHook}:""`);
  //   });
  // };

  return (
    <div className={css.content__account}>
      <div className={css.btnHeader}>
        {!!webHook && webHook !== "invalid" && (
          <Link to={webToken} className="btn__primary">
            Continuar al sitio Principal
          </Link>

          // <a className='btn__primary' href={webToken}>
          //   Continuar al sitio Principal
          // </a>
        )}
      </div>

      <div className={css.avatarMobile}>
        <img src={getPhotoUrl()} alt="imagen del profile" />
        <span className={css.name}>{fullName}</span>
      </div>

      <div className={css.desktopHellow}>
        <span className={css.name}>hola {fullName}! bienvenid@!</span>
      </div>

      <div className={css.points}>
        <div className={css.acumulate}>
          <p className="">Puntos acumulados:</p>
          <p className="">{accumulatedPoints}</p>
        </div>
        <div className={css.acumulate}>
          <p className="">Puntos por vencer:</p>
          <p className="">{expirationPoints}</p>
        </div>
      </div>

      <div className={css.credential}>
        <div></div>
        <span className={css.title}>Credencial</span>
        <span className={css.number}>{credencial.number}</span>
        <span className={css.cod}>Cód. Seguridad: {credencial.code}</span>
      </div>
      <div className={css.conten__btn}>
        <button onClick={handleLastMovement} className="btn__secondary">
          Regresar a la tienda
        </button>

        <button onClick={handlePersonalData} className="btn__tertiary">
          Datos Personales
        </button>

        <button onClick={handlePersonalData} className="btn__tertiary">
          Mi historial de puntos
        </button>
      </div>
    </div>
  );
};

export default StateAccount;
