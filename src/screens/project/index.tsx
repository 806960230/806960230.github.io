import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={"kanban"}>projectScreen</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={"epic"}>task description</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/*projects/:projectId/kanban*/}
          <Route path={"kanban"} element={<KanbanScreen />}></Route>
          {/*projects/:projectId/epic*/}
          <Route path={"epic"} element={<EpicScreen />}></Route>
          {/*  默认路由 */}
          <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} replace={true}/>} />  
          {/* <Navigate to={window.location.pathname + "/kanban"} replace={true}></Navigate> */}
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
 background-color: rgb(244, 245, 247);
 display: flex;
`

const Main = styled.div`
box-shadow: -5px 0 5px -5px rgba(0,0,0,.1);
display: flex;
overflow: hidden;
`
const Container = styled.div`
 display: grid;
 grid-template-columns: 16rem 1fr;
 width: 100%;

`