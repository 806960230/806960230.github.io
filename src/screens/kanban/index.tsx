import React from "react";
import { Helmet } from "react-helmet";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useKanbanSearchParams, useKanbansQueryKey, useProjectIdInUrl, useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from './util';
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { KanbanColumn } from "./kanban-column";
import { useCallback } from 'react';


export const KanbanScreen = () => {


  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading

  // return (
  //   <div>
  //     <h3>{currentProject?.name}</h3>
  //     {
  //       kanbans?.map(kanban => <div key={kanban.id}>
  //          {kanban.name}
  //       </div>)
  //     }
  //   </div>
  // )
  return (

    <ScreenContainer>
      <Helmet>
        <title>noticeboard</title>
      </Helmet >
      <SearchPanel ></SearchPanel>
      <h1>{currentProject?.name} ProjectScreen</h1>
      {isLoading ? <Spin size={"large"}></Spin> :

        <ColumnsContainer>    
              {
                kanbans?.map((kanban, index) => (
                 
                    <KanbanColumn kanban={kanban} key={kanban.id} />

                ))

              }
          <CreateKanban />
        </ColumnsContainer>


      }
      <TaskModal />
    </ScreenContainer>
  )
  // return (
  //   <DragDropContext onDragEnd={useDragEnd}>
  //     <ScreenContainer>
  //       <Helmet>
  //         <title>请登录或注册以继续</title>
  //       </Helmet >
  //       <SearchPanel ></SearchPanel>
  //       {/* <h1>{currentProject?.name}看板</h1> */}
  //       {isLoading ? <Spin size={"large"}></Spin> :

  //         <ColumnsContainer>
  //           <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
  //             <DropChild style={{ display: 'flex' }}>
  //               {
  //                 kanbans?.map((kanban, index) => (
  //                   <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
  //                     <KanbanColumn kanban={kanban} key={kanban.id} />
  //                   </Drag>

  //                 ))

  //               }
  //             </DropChild>
  //           </Drop>
  //           <CreateKanban />
  //         </ColumnsContainer>


  //       }
  //       <TaskModal />
  //     </ScreenContainer>;
  //   </DragDropContext>)
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())
  const { data: allTasks = [] } = useTasks(useTasksSearchParams())
  const { data: reorderTask } = useReorderTask(useTasksQueryKey())
  return useCallback(({ source, destination, type }: DropResult) => {
    if (!destination) {
      return
    }
    if (type === 'COLUMN') {
      const fromId = kanbans?.[source.index].id
      const toId = kanbans?.[destination.index].id
      if (!fromId || !toId || fromId === toId) {
        return
      }
      const type = destination.index > source.index ? 'after' : 'before'
      reorderKanban({ fromId, referenceId: toId, type })

    }

    if (type === 'ROW') {
      const fromKanbanId = +source.droppableId;
      const toKanbanId = +destination.droppableId;
      if (fromKanbanId === toKanbanId) {
        return
      }
      const fromTask = allTasks?.filter(task => task.kanbanId === fromKanbanId)[source.index]
      const toTask = allTasks.filter(task => task.kanbanId === toKanbanId)[destination.index]
      if (fromTask.id === toTask.id) {
        return
      }
      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTask?.id,
        fromKanbanId,
        toKanbanId,
        type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
      })

    }
  }, [kanbans, reorderKanban, allTasks, reorderTask])
}

const Main = styled.div`
box-shadow: -5px 0 5px -5px rgba(0,0,0,.1);
display: flex;
`

export const ColumnsContainer = styled('div')`
display: flex;
overflow-x: scroll;
flex: 1;
`