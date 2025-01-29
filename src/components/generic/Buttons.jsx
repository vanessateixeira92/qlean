import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
import Colors from "./Colors";
import Typography from "./Typography";

// Container
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 335px;
`;

// Botão base
const BaseButton = styled.button`
  margin: 10px 0;
  height: 45px;
  padding: 10px 22px;
  font-size: ${Typography.p.xlarge.fontSize};
  font-weight: ${Typography.p.large.fontWeight};
  font-family: ${Typography.fontFamilyOutfit};
  border-radius: 6px;
  width: 100%;
  transition: transform 300ms ease-out;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }
`;

// Botão para Enter
const EnterButton = styled(BaseButton)`
  background-color: ${Colors.backgroundWhite};
  color: ${Colors.textPrimary};
`;

// Botão para "Login Welcome"
const LoginWelcomeButton = styled(BaseButton)`
  background-color: ${Colors.backgroundWhite};
  color: ${Colors.textPrimary};
`;

// Botão para "Sign Up Welcome"
const SignUpWelcomeButton = styled(BaseButton)`
  background-color: ${Colors.backgroundBlueViolet};
  color: ${Colors.textWhite};
  border: 1px solid ${Colors.textWhite};
`;

// Botão para Login
const LoginButton = styled(BaseButton)`
  background-color: ${Colors.backgroundAquaVibrant};
  color: ${Colors.textWhite};
  border: none;
`;

// Botão para Sign Up
const SignUpButton = styled(BaseButton)`
  background-color: ${Colors.backgroundAquaVibrant};
  color: ${Colors.textWhite};
`;

// Botão para Google
const GoogleButton = styled(BaseButton)`
  background-color: ${Colors.backgroundWhite};
  color: ${Colors.textGrey};
  border: 1px solid ${Colors.textGrey};

  svg {
    margin-right: 8px;
  }
`;

// Botão para MBWAY
const MBWAYButton = styled(BaseButton)`
  background-color: ${Colors.backgroundBlueViolet};
  color: ${Colors.textWhite};
  border: none;
`;

// Botão para ScheduleMBWAY
const ScheduleButton = styled(BaseButton)`
  background-color: ${Colors.backgroundBlueViolet};
  color: ${Colors.textWhite};
  border: none;
`;

// Botão para MBWAYDone
const DoneButton = styled(BaseButton)`
  background-color: ${Colors.backgroundBlueViolet};
  color: ${Colors.textWhite};
  border: none;
`;

const Button = ({ text, variant = "primary", onClick }) => {
  return (
    <ButtonContainer>
      {variant === "enter" && (
        <EnterButton onClick={onClick}>{text}</EnterButton>
      )}
      {variant === "loginWelcome" && (
        <LoginWelcomeButton onClick={onClick}>{text}</LoginWelcomeButton>
      )}
      {variant === "signUpWelcome" && (
        <SignUpWelcomeButton onClick={onClick}>{text}</SignUpWelcomeButton>
      )}
      {variant === "login" && (
        <LoginButton onClick={onClick}>{text}</LoginButton>
      )}
      {variant === "signUp" && (
        <SignUpButton onClick={onClick}>{text}</SignUpButton>
      )}
      {variant === "google" && (
        <GoogleButton onClick={onClick}>
          <FcGoogle size={20} /> {/* Ícone do Google */}
          {text}
        </GoogleButton>
      )}
      {variant === "mbway" && (
        <MBWAYButton onClick={onClick}>
          {text} <img src="/icon/mbway.svg" alt="mbway icon" />
        </MBWAYButton>
      )}
      {variant === "schedule" && (
        <ScheduleButton onClick={onClick}>
          {text} <img src="/icon/mbway.svg" alt="mbway icon" />
        </ScheduleButton>
      )}
      {variant === "done" && <DoneButton onClick={onClick}>{text}</DoneButton>}
    </ButtonContainer>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
