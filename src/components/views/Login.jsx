import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../generic/Header";
import Button from "../generic/Buttons";
import InputField from "../forms/InputField";
import PasswordInput from "../forms/PasswordInput";
import Checkbox from "../forms/CheckBox";
import Separator from "../generic/Separator";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import styled from "styled-components";
import axios from "axios";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  overflow: scroll;
  position: relative;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
  }
`;

const TitleButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
  width: 100%;
`;

const TitleContainer = styled.div`
  text-align: left;
  width: 90%;
  max-width: 335px;
  margin-bottom: 7%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-bottom: 15%;
  }
`;

const LoginTitle = styled.h1`
  font-size: ${Typography.h1.medium.fontSize};
  font-weight: ${Typography.h1.medium.fontWeight};
  line-height: ${Typography.h1.medium.lineHeight};
  letter-spacing: ${Typography.h1.medium.letterSpacing};
  color: ${Colors.textWhite};
  margin-bottom: 0;
`;

const LoginDescription = styled.p`
  color: ${Colors.textWhite};
  font-family: ${Typography.fontFamily};
  font-size: ${Typography.p.xlarge.fontSize};
  font-weight: ${Typography.p.xlarge.fontWeight};
  line-height: ${Typography.p.xlarge.lineHeight};
  letter-spacing: ${Typography.p.xlarge.letterSpacing};
`;

const FieldsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: ${Colors.backgroundWhite};
  padding: 0 20px 20px;
  margin-bottom: 0;

  &::after {
    content: "";
    position: absolute;
    top: -260px;
    left: 0;
    width: 100%;
    height: 260px;
    background: url(/wave.svg) no-repeat center;
    background-size: cover;
    z-index: -1;

    @media (max-width: 768px) {
      height: 120px;
      top: -120px;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const LoginFooter = styled.p`
  color: ${Colors.textGrey};
  font-family: ${Typography.fontFamilyOutfit};
  font-size: ${Typography.p.regularSmall.fontSize};
  font-weight: ${Typography.p.regularSmall.fontWeight};
  line-height: ${Typography.p.regularSmall.lineHeight};
  align-self: center;

  a {
    color: ${Colors.textBlueViolet};
    text-decoration: none;
    font-weight: bold;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(""); // Para mostrar erros

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Envia a requisição de login para o backend (ajustar o URL conforme API)
      const response = await axios.post("", {
        email,
        password,
      });

      // Supondo que o backend retorne um token de autenticação
      if (response.data.token) {
        // Armazena o token no localStorage ou em algum estado global
        localStorage.setItem("token", response.data.token);

        // Redireciona o usuário para a página /home
        navigate("/home");
      } else {
        setError("Login falhou. Verifique suas credenciais.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao conectar-se ao servidor.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
    // Implemente a lógica do login com Google
  };

  return (
    <LoginContainer>
      <Header />
      <TitleButtonContainer>
        <TitleContainer>
          <LoginTitle>Login</LoginTitle>
          <LoginDescription>Login into your account!</LoginDescription>
        </TitleContainer>

        <FieldsContainer>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <InputContainer>
            <InputField
              type="email"
              placeholder="Email"
              icon="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Checkbox
              label="Remember me"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
          </InputContainer>
          <ButtonContainer>
            <Button text="Login" variant="login" onClick={handleLogin} />

            <Separator />

            <Button
              text="Continue with Google"
              variant="google"
              onClick={handleGoogleLogin}
            />
          </ButtonContainer>
          <LoginFooter>
            Don’t have an account? <a href="/signup">Sign Up now</a>
          </LoginFooter>
        </FieldsContainer>
      </TitleButtonContainer>
    </LoginContainer>
  );
};

export default Login;
