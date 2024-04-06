import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card, Divider, Button, Typography } from "antd";
import left from "assets/left.svg";
import right from "assets/right.svg";
import logo from "assets/cubic.png";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import { ErrorBox } from "components/lib";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Helmet>
        <title>cubic software</title>
      </Helmet>
      <Header>
        Cubic Software
      </Header>
      
      <Background />
      {/* <Button
        onClick={() => {
          throw new Error("你好错误");
        }}
      ></Button> */}
      <ShadowCard>
        <img src={logo} style={{width: 100, height: 100, marginBottom: 40}}/>
        <Title>{isRegister ? "Please Register" : "Please Login"}</Title>
        <ErrorBox error={error} />
        {/* {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null} */}
        {isRegister ? (
          <RegisterScreen onError={setError}></RegisterScreen>
        ) : (
          <LoginScreen onError={setError}></LoginScreen>
        )}
        <Divider />

        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "I need to login directly" : "create a new account"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position:
    left bottom,
    right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  font-size: 10rem;
  font-height: bold;
  position: relative;
  top: -10rem;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
