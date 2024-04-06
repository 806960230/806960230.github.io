import React, { useState } from 'react'
import { useAddTask } from 'utils/task'
import { useProjectIdInUrl, useTasksQueryKey } from './util'
import { useEffect } from 'react';
import { Card, Input } from 'antd';

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
    
    const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
    const projectId = useProjectIdInUrl().id;
    const [name, setName] = useState('')
    const [inputMode, setInputMode] = useState(false);

    const submit = async () => {
        await addTask({ projectId, name, kanbanId })
        setInputMode(false)
        setName('')
    }
    const toggle = () => setInputMode(mode => !mode)

    useEffect(() => {
        if (!inputMode) {
            setName('')
        }
    }, [inputMode])

    if (!inputMode) {
        return <div onClick={toggle}>+ceate a task</div>
    }

    return <Card>
        <Input onBlur={toggle} placeholder={'需要做些什么'} autoFocus={true} onPressEnter={submit}
            value={name} onChange={evt => setName(evt.target.value)}
        />
    </Card>
}
