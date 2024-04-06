import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from './util';
import { useTaskTypes } from "utils/task-type"
import taskIcon from "assets/task.png";
import bugIcon from "assets/bug.png";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img style={{width: 20, height: 20}}src={name === "task" ? taskIcon : bugIcon} />
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal()
    const { name: keyword } = useTasksSearchParams()
    return <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }} key={task.id}>

        <p>
            <Mark keyword={keyword} name={task.name} />
        </p>

        <TaskTypeIcon id={task.typeId}></TaskTypeIcon>
    </Card>
}
// export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
//     const {data: allTasks} = useTasks(useTasksSearchParams())
//     const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
//     return <Container>
//         <h3>{kanban.name}</h3>
//         {tasks?.map(task => <div key={task.id}>
//             {task.name}
//             <TaskTypeIcon id={task.typeId} />
//         </div>)}
//     </Container>
// }
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

    return <Container>
        <Row between={true}>
            <h3>{kanban.name}</h3>
            <More kanban={kanban} key={kanban.id}></More>
        </Row>
        <TasksContainer>
            {tasks?.map((task, taskIndex) => (

                <div>
                    <TaskCard task={task} key={task.id}></TaskCard>
                </div>
            ))

            }
            <CreateTask kanbanId={kanban.id}></CreateTask>
        </TasksContainer>

    </Container>
};

// export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban, ...props }, ref) => {
//     const { data: allTasks } = useTasks(useTasksSearchParams())
//     const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

//     return <Container {...props} ref={ref}>
//         <Row between={true}>
//             <h3>{kanban.name}</h3>
//             <More kanban={kanban} key={kanban.id}></More>
//         </Row>
//         <h3>{kanban.name}</h3>
//         <TasksContainer>
//             <Drop type={'ROW'} direction={'vertical'} droppableId={'' + kanban.id}>
//                 <DropChild style={{ minHeight: '5px' }}>
//                     {tasks?.map((task, taskIndex) => (
//                         <Drag key={task.id} draggableId={'task' + task.id} index={taskIndex}>
//                             <div ref={ref}>
//                                 <TaskCard task={task} key={task.id}></TaskCard>
//                             </div>
//                         </Drag>
//                     ))

//                     }

//                 </DropChild>
//             </Drop>
//             <CreateTask kanbanId={kanban.id}></CreateTask>
//         </TasksContainer>

//     </Container>
// });

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())
    const startEdit = () => {
        Modal.confirm({
            okText: 'Yes',
            cancelText: 'No',
            title: 'are you sure to delete the project screen?',
            onOk() {
                mutateAsync({ id: kanban.id })
            }
        })
    }

    const overlay = <Menu>
        <Menu.Item>
            <Button onClick={startEdit} type={'link'}>delete</Button>
        </Menu.Item>
    </Menu>

    return <Dropdown overlay={overlay}>
        <Button type={'link'}>...</Button>
    </Dropdown>
}

export const Container = styled.div`
 min-width: 27rem;
 border-radius: 6px;
 background-color: rgb(244, 245, 247);
 display: flex;
 flex-direction: column;
 padding: 0.7rem 0.7rem 1rem;
 margin-right: 1.5rem;
`

const TasksContainer = styled.div`
 overflow:scroll;
 flex: 1;
 ::-webkit-scrollbar {
    display: none;
 }
`