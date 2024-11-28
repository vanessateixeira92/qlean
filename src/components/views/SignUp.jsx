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

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
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

const SignUpTitle = styled.h1`
  font-size: ${Typography.h1.medium.fontSize};
  font-weight: ${Typography.h1.medium.fontWeight};
  line-height: ${Typography.h1.medium.lineHeight};
  letter-spacing: ${Typography.h1.medium.letterSpacing};
  color: ${Colors.textWhite};
  margin-bottom: 0;
`;

const SignUpDescription = styled.p`
  color: ${Colors.textWhite};
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

const SignUpFooter = styled.p`
  color: ${Colors.textGrey};
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!name || !email || !password || !acceptTerms) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    console.log("Sign Up submitted", { name, email, password });

    // Após o registro bem-sucedido, redireciona para a página de login
    navigate("/login");
  };

  const handleGoogleSignUp = () => {
    console.log("Sign Up com Google");
  };

  return (
    <SignUpContainer>
      <Header />
      <TitleButtonContainer>
        <TitleContainer>
          <SignUpTitle>Sign Up</SignUpTitle>
          <SignUpDescription>Create an account on Qlean</SignUpDescription>
        </TitleContainer>

        <FieldsContainer>
          <InputContainer>
            <InputField
              type="text"
              placeholder="Name"
              icon="user"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputContainer>
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
            <Button text="Sign Up" variant="signUp" onClick={handleSignUp} />
            <Separator />
            <Button
              text="Continue with Google"
              variant="google"
              onClick={handleGoogleSignUp}
            />
          </ButtonContainer>

          <SignUpFooter>
            Already have an account? <a href="/login">Login now</a>
          </SignUpFooter>
        </FieldsContainer>
      </TitleButtonContainer>
    </SignUpContainer>
  );
};

export default SignUp;
