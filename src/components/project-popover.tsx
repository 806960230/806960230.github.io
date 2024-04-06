import React from "react";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, isLoading, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>collect project</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      <ButtonNoPadding onClick={open} style={{ padding: 0 }} type={"link"}>
        create project
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover onVisibleChange={() => refetch()} placement={"bottom"} content={content}>
      <BigText>Project</BigText>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

const BigText = styled.span`
  font-size: 28px;
  font-weight: bold;
`
