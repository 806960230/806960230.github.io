import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ButtonNoPadding, Row } from "components/lib";
import { Dropdown, Menu, Button, Image } from "antd";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { useState } from "react";
import { ProjectPopover } from "components/project-popover";
import { useDispatch } from 'react-redux'
import { UserPopover } from "components/user-popover";
import cubicLogo from "./assets/cubic.png"
import styled from "@emotion/styled";


export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader ></PageHeader>
        <Main>
          {/* <ProjectListScreen /> */}

          <Routes>
            {/* <Route
                path={"/"}
                element={
                  <ProjectListScreen />
                }
              ></Route> */}
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen />
              }
            ></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Route path="*" element={<Navigate to="/projects" replace={true} />} />
          </Routes>


          <ProjectModal ></ProjectModal>
          {/* <ProjectModal
          projectModalOpen={projectModalOpen}
          onClose={() => setProjectModalOpen}
        ></ProjectModal> */}
        </Main>
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <img src={cubicLogo} style={{ width: 30, height: 30, marginTop: -5 }} />
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <MiddleText>Cubic Software</MiddleText>
        </ButtonNoPadding>
        <ProjectPopover ></ProjectPopover>
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logou"}>
            <Button type={"link"} onClick={logout}>
              logOut
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height:100vh;

`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  display:flex;
  width:100%;
`;
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
`;

const HeaderRight = styled.div``;
const Main = styled.main`
display: flex;
overflow: hidden;
`;

const BigText = styled.span`
  font-size: 28px;
  font-weight: bold;
`
const MiddleText = styled.span`
  font-size: 26px;
  font-weight: bold;
  line-height: 30px;
`

const Nav = styled.nav``;

const Aside = styled.aside``;

const Footer = styled.footer``;


// const Main = styled.main`
// height: calc(100vh - 6rem)
// `
