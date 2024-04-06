import React from 'react'
import { useState } from "react"
import { useProjects } from "utils/project"
import { useKanbansQueryKey, useProjectIdInUrl } from "./util"
import { useAddKanban } from "utils/kanban"
import { ColumnsContainer } from "./index"
import { Container } from './kanban-column'
import { Input } from "antd"

export const CreateKanban = () => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl().id
    const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())

    const submit = async () => {
        await addKanban({ name, projectId })
        setName('')
    }

    return <Container>
        <Input size={"large"} placeholder={"create the project screen"} onPressEnter={submit} value={name}
            onChange={evt => setName(evt.target.value)}
        />
    </Container>
}