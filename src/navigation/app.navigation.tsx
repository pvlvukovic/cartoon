import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header.component";
import Characters from "../pages/characters/characters.page";
import NotFoundPage from "../pages/errors/404.page";

const AppNavigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Characters />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigation;
