import React from "react";
import { List, Project } from "./list";
import { SearchPanel } from "./search-panel";
import { useState, useEffect } from "react";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { Button } from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib";
import { TsReactTest } from "screens/test1";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  // const [param, setParam] = useState({
  //     name: '',
  //     personId: 0
  // })
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  // const debouncedParam = useDebounce(param, 2000);
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 2000));
  const { data: users } = useUsers();
  const client = useHttp();
  return (
    <Container>
      {/* <Helmet>
        <title>请登录或注册以继续</title>
      </Helmet> */}
      <Row between={true}>
        <h1>Project List</h1>
        <ButtonNoPadding onClick={open} style={{ padding: 0 }} type={"link"}>
          create project
        </ButtonNoPadding>
      </Row>

      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
      {/* <TsReactTest /> */}
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
  height: 100%;
  width: 100%;
`;
