import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CharactersPage from "../pages/characters/Characters";
import NotFoundPage from "../pages/errors/404";
import LocationsPage from "../pages/locations/Locations";

const AppNavigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigation;
