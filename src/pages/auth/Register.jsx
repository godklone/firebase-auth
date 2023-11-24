import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { startTransition, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFormik } from "formik";

import { getFirebaseAuthError } from "../../utils/mapFirebaseError";
import { validationRegisterSchema } from "../../validation";
import css from "../../assets/styles/pages/loginFlow.module.scss";

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(values.email, values.password);

      await Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Revisa tu correo y valida tu cuenta.",
        showConfirmButton: true,
        confirmButtonText: "Continuar",
      });

      startTransition(() => {
        navigate("/home");
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: getFirebaseAuthError(error.code),
        showConfirmButton: true,
        confirmButtonText: "Continuar",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // customClass: {
  //   container: 'my-swal-container',
  //   title: 'my-swal-title',
  //   content: 'my-swal-content',
  //   confirmButton: 'my-swal-confirm-button',
  //   cancelButton: 'my-swal-cancel-button',
  //   closeButton: 'my-swal-close-button',
  // },
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit,
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="container_aux">
      <h4 className="heading">Regístrate con tu email</h4>
      <div className={css.content__register}>
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <div className="textfields">
            <div className="textfield">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu mail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label htmlFor="email">Email</label>
              <div className="alert__error">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </div>
            </div>

            <div className="textfield">
              <input
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <label htmlFor="password">Elige una contraseña</label>
              <div className="alert__error">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </div>
            </div>

            <div className="textfield">
              <input
                id="repeatPassword"
                name="repeatPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeatPassword}
              />
              <label htmlFor="repeatPassword">Repite la contraseña</label>
              <div className="alert__error">
                {formik.touched.repeatPassword && formik.errors.repeatPassword
                  ? formik.errors.repeatPassword
                  : null}
              </div>
            </div>
          </div>

          {/* <div className=''>
            <input
              type='checkbox'
              id='showPassword'
              name='showPassword'
              checked={showPassword}
              onChange={handleShowPassword}
            />
            <label htmlFor='showPassword'>Show password</label>
          </div> */}
          <p className={css.goLogin}>
            <Link to="/login" className="link">
              ¿Tienes cuenta? Ingresa aca
            </Link>
          </p>

          <div className={css.contentBtn}>
            <button
              type="submit"
              className="btn__primary"
              disabled={formik.isSubmitting}
            >
              Crear cuenta
            </button>

            <p className={css.note}>Recibirás un mail para validar tu cuenta</p>
            <button onClick={handleCancel} className="btn__tertiary">
              Volver
            </button>
          </div>
          <div className={css.politicas}>
            <p>Al registrarme, declaro que soy mayor</p>
            <p>
              de edad y acepto los <a href="#">términos y condiciones</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
