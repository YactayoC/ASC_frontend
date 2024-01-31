import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/auth/candidate/Register";
import Login from "../pages/auth/candidate/Login";
import Alerts from "../pages/candidate/Alerts";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/auth/candidate/login" element={<Login />} />
        <Route path="/auth/candidate/register" element={<Register />} />

        {/* Candidate */}
        <Route path="/candidate/alerts" element={<Alerts />} />

        {/* <Route
            path="/admin/*"
            element={
              <PrivateRoute isAuthenticated={true}>
                <PrivateRouter />
              </PrivateRoute>
            }
          /> */}

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
