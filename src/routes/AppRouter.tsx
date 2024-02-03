import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/auth/candidate/Register";
import Login from "../pages/auth/candidate/Login";
import Alerts from "../pages/candidate/Alerts";
import MyAccount from "../pages/candidate/MyAccount";
import MyCV from "../pages/candidate/MyCV";
import ResultsSearch from "../pages/candidate/ResultsSearch";

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
        <Route path="/candidate/my-account" element={<MyAccount />} />
        <Route path="/candidate/my-cv" element={<MyCV />} />
        <Route
          path="/candidate/search/:value/:location?"
          element={<ResultsSearch />}
        />

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
