import React from "react";
import { useTasksSearchParams } from "./util";
import { useSetUrlSearchParam } from "utils/url";
import { Row } from "components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";


export const SearchPanel = () => {
    const searchParams = useTasksSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined
        })
    }

    return <Row marginBottom={4} gap={true}>
        <Input style={{ width: '20rem' }}  placeholder={'task_name'} onChange={evt => setSearchParams({ name: evt.target.value })} />
        {/* <Input style={{ width: '20rem' }} placeholder={'task_name'} value={searchParams.name}
            onChange={evt => setSearchParams({ name: evt.target.value })} /> */}
        <UserSelect defaultOptionName={'administrator'} value={searchParams.processorId} onChange={value => setSearchParams({ processorId: value })}></UserSelect>
        <TaskTypeSelect defaultOptionName={'kind'} value={searchParams.typeId} onChange={value => setSearchParams({ typeId: value })}></TaskTypeSelect>
        <Button onClick={reset}>clear filters</Button>
    </Row>
}