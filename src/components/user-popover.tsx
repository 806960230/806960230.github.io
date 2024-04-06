import React from "react";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";
import { useAddUsers, useUsers } from "utils/user";
import { useEffect, useState } from 'react';
import { Card, Input } from 'antd';

const CreateUser = () => {
    
    const {mutate: addUser, isLoading, error} = useAddUsers(['users'])
    const [name, setName] = useState('')
    const [inputMode, setInputMode] = useState(false);

    const submit = async () => {
        await addUser({"id": 123, name})
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
        return <div onClick={toggle}>+ ceate a new user</div>
    }

    return <Card>
        <Input onBlur={toggle} placeholder={'write a username'} autoFocus={true} onPressEnter={submit}
            value={name} onChange={evt => setName(evt.target.value)}
        />
    </Card>
}

export const UserPopover = () => {

    const { data: users, refetch } = useUsers()
    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>users' list</Typography.Text>
            <List>
                {users?.map((user) => (
                    <List.Item key={user.id}>
                        <List.Item.Meta title={user.name} />
                    </List.Item>
                ))}
            </List>
            <Divider></Divider>
            <CreateUser />
            {/* <ButtonNoPadding onClick={open} style={{ padding: 0 }} type={"link"}>
                create Users
            </ButtonNoPadding> */}
        </ContentContainer>
    );
    return (
        <Popover onVisibleChange={() => refetch()} placement={"bottom"} content={content}>
            <BigText>User</BigText>
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
