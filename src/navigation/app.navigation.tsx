import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header.component";
import Characters from "../pages/characters/characters.page";

const AppNavigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/locations" element={<div>Locations</div>} />
          <Route path="/episodes" element={<div>Episodes</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigation;
