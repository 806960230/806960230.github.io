import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDeleteEpic, useEpics, } from "utils/epic";
import { useEpicSearchParams, useEpicsQueryKey, useProjectIdInUrl, useProjectInUrl } from './util';
import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task";
import { Button, List, Modal, Row, Spin } from "antd";

import { useCallback } from 'react';
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { Epic } from "types/epic";
export const EpicScreen = () => {

  const { data: currentProject } = useProjectInUrl()
  const { data: epics, isLoading: epicIsLoading } = useEpics(useEpicSearchParams())
  const { data: tasks } = useTasks({ projectId: currentProject?.id })
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      okText: 'Yes',
      cancelText: 'No',
      title: 'make sure to delete the description?',
      onOk() {
        deleteEpic({ id: epic.id })
      }
    })
  }
  return (

    <ScreenContainer>
      <Row justify="space-between">
        <h1>{currentProject?.name} description</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={'link'}>create description</Button>
      </Row>

      <List style={{ overflow: 'scroll' }} dataSource={epics} itemLayout={'vertical'} renderItem={epic => (<List.Item>
        <List.Item.Meta title={<Row justify="space-between">
          <span>
            {epic.name}
          </span>
          <Button type={'link'} onClick={() => confirmDeleteEpic(epic)}>delete</Button>

        </Row>}
          description={<div>
            <div>start_time: {dayjs(epic.start).format('YYYY-MM-DD')}</div>
            <div>end_time: {dayjs(epic.end).format('YYYY-MM-DD')}</div>
          </div>}>
        </List.Item.Meta>
        <div>
          {tasks?.filter(task => task.epicId === epic.id).map(task => <Link to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`} key={task.id}>{task.name}</Link>)}
        </div>
      </List.Item>)} />
      <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
    </ScreenContainer>
  )

};