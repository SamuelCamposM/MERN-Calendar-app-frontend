import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onSliceLogin,
  onSliceLogout,
  onSlicechecking,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onStartLogin = async ({ email, password }) => {
    dispatch(onSlicechecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-data", new Date().getTime());
      dispatch(onSliceLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      dispatch(onSliceLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
  const onStartRegister = async ({ name, email, password }) => {
    dispatch(onSlicechecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-data", new Date().getTime());
      dispatch(onSliceLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      dispatch(onSliceLogout(error.response?.data?.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
  const onStartSheckAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onSliceLogout());
    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-data", new Date().getTime());
      dispatch(onSliceLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      localStorage.clear();
      dispatch(onSliceLogout());
    }
  };

  const onStartLogout = () => {
    localStorage.clear();
    dispatch(onSliceLogout());
  };
  return {
    //*Propiedades
    status,
    user,
    errorMessage,
    //Metodos
    onStartLogin,
    onStartLogout,
    onStartRegister,
    onStartSheckAuthToken,
  };
};
