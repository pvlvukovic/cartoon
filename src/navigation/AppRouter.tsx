import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header.component";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/characters" element={<div>Characters</div>} />
          <Route path="/locations" element={<div>Locations</div>} />
          <Route path="/episodes" element={<div>Episodes</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
