import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Welcome from "./components/views/Welcome";
import Home from "./components/views/Home";
import LaundryResults from "./components/views/LaundryResults";
import WashFold from "./components/views/WashFold";
import Payment from "./components/views/Payment";
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
      <Route path="/home" element={<Home />} />
      <Route path="/laundryresults" element={<LaundryResults />} />
      <Route path="/washfold" element={<WashFold />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/login/home" element={<Home />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <GlobalStyle />
      <AppRouter />
    </Router>
  );
};

export default App;
