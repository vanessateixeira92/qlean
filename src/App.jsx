import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Welcome from "./components/views/Welcome";
import Login from "./components/views/Login";
import SignUp from "./components/views/SignUp";
import Home from "./components/views/Home";
import NearYou from "./components/views/NearYou";
import WashFold from "./components/views/WashFold";
import "./App.css";
import GlobalStyle from "./GlobalStyle";

// Componente AppRouter para gerenciar rotas
const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    // Adiciona ou remove a classe 'no-background' com base na URL
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      document.body.classList.remove("no-background"); // Remover fundo
    } else {
      document.body.classList.add("no-background"); // Adicionar fundo
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/nearyou" element={<NearYou />} />
      <Route path="/washfold" element={<WashFold />} />
      <Route path="/login/home" element={<Home />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppRouter />
    </Router>
  );
};

export default App;
