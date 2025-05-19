import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CocktailDetailPage from "./pages/CocktailDetailPage";
import RandomCocktailPage from "./pages/RandomCocktailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cocktail/:id" element={<CocktailDetailPage />} />
        <Route path="random" element={<RandomCocktailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
