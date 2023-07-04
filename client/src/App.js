import "./App.css";
import LoginPage from "./pages/LoginPage";
import SitePage from "./pages/SitePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useCallback } from "react";
import AccountPage from "./pages/AccountPage";
import NotFound from "./components/NotFound";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { retrieveTutorials } from "./actions/tutorials";
import { relogin } from "./actions/userData/user";
import MainPage from "./pages/MainPage";
import Pages from "./pages/Pages";
import RatingPage from "./pages/RatingPage";
import MyRatingsPage from "./pages/MyRatingsPage";
try {
  localStorage.getItem("user");
} catch {
  localStorage.removeItem("user");
}

function App() {
  const userData = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const fetchBusinesses = useCallback(() => {
    if (localStorage.getItem("token") && userData.user == null) {
      dispatch(relogin());
    }
  }, []);
  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

 

  useEffect(() => {
    dispatch(retrieveTutorials());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages />}>
            <Route index={true} element={<MainPage />} />
            <Route path="/Rating" element={<RatingPage />} />
            <Route path="/Site/:domain" element={<SitePage />} />
            <Route path="/myRatings" element={<MyRatingsPage />} />
            <Route path="/Account/:username" element={<AccountPage />} />
          </Route>

          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
