import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../generic/Header";
import Button from "../generic/Buttons";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import styled from "styled-components";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  margin: 0 auto;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  text-align: left;
  min-width: 335px;
  margin-bottom: 15px;
`;

const WelcomeTitle = styled.h1`
  font-size: ${Typography.h1.large.fontSize};
  font-weight: ${Typography.h1.large.fontWeight};
  line-height: ${Typography.h1.large.lineHeight};
  letter-spacing: ${Typography.h1.large.letterSpacing};
  color: ${Colors.textWhite};
  margin-bottom: 0;
`;

const WelcomeParagraph = styled.p`
  color: ${Colors.textWhite};
  font-size: ${Typography.p.xlarge.fontSize};
  font-weight: ${Typography.p.xlarge.fontWeight};
  line-height: ${Typography.p.xlarge.lineHeight};
  letter-spacing: ${Typography.p.xlarge.letterSpacing};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 335px;
  margin-bottom: 40px;
`;

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <WelcomeContainer>
        <Header />
        <TitleContainer>
          <WelcomeTitle>Welcome</WelcomeTitle>
          <WelcomeParagraph>
            Lorem ipsum dolor sit amet consectetur.
            <br />
            Elit amet faucibus enim eu.
          </WelcomeParagraph>
        </TitleContainer>

        <ButtonContainer>
          <Button
            text="Login"
            variant="loginWelcome"
            onClick={() => navigate("/login")}
          />
          <Button
            text="Sign Up"
            variant="signUpWelcome"
            onClick={() => navigate("/signup")}
          />
        </ButtonContainer>
      </WelcomeContainer>
    </div>
  );
};

export default Welcome;
