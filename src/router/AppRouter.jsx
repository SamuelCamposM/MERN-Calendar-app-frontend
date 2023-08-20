import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, onStartSheckAuthToken } = useAuthStore();
  useEffect(() => {
    onStartSheckAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando</h3>;
  }
  console.log({ status });
  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}

      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
