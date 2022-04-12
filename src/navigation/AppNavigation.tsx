import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import CharactersPage from "../pages/Characters/Characters";
import NotFoundPage from "../pages/Errors/404";
import LocationsPage from "../pages/Locations/Locations";

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
