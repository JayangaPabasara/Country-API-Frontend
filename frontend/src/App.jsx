import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Favorites from "./pages/Favorites";
import NotFoundPage from "./pages/NotFoundPage";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import LoginPage from "./pages/Login/LoginPage";

const App = () => {
  return (
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details" element={<CountryDetailsPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;