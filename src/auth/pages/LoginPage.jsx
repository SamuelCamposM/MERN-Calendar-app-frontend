import Swal from "sweetalert2";
import { validarEmail } from "../../helpers";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import { useEffect } from "react";

const loginFormFields = {
  loginEmail: "s.cmelara12@gmail.com",
  loginPassword: "123456",
};
const loginFormValidations = {
  loginEmail: [
    (value) => validarEmail(value),
    "El formato del correo no es valido",
  ],
  loginPassword: [
    (value) => value.length >= 6,
    "El password debe de tener mas de 6 letras",
  ],
};
const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { onStartLogin, onStartRegister, errorMessage } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onInputChangeLogin,
  } = useForm(loginFormFields, loginFormValidations);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onInputChangeRegister,
  } = useForm(registerFormFields);
  const loginSubmit = (e) => {
    e.preventDefault(); 
    onStartLogin({ email: loginEmail, password: loginPassword });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      return Swal.fire(
        "Error en registro",
        "Contraseñas no coinciden",
        "error"
      );
    }
    onStartRegister({
      email: registerEmail,
      password: registerPassword,
      name: registerName,
    }); 
  };
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la Autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onInputChangeLogin}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onInputChangeLogin}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onInputChangeRegister}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onInputChangeRegister}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onInputChangeRegister}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onInputChangeRegister}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
