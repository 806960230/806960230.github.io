import { useForm } from "antd/es/form/Form";
import React from "react";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useDeleteTask, useEditTask } from "utils/task";
import { useEffect } from 'react';
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { Kanban } from '../../types/kanban';
import { TaskTypeSelect } from "components/task-type-select";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, close } = useTasksModal()
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
    const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());
    const onCancel = () => {
        close()
        form.resetFields()
    }

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        close()
    }

    const startDelete = () => {
        close()
        Modal.confirm({
            okText: 'Yes',
            cancelText: 'Cancel',
            title: 'are you sure to delete the task?',
            onOk() {
                return deleteTask({ id: Number(editingTaskId) })
            }
        })
    }

    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

    return <Modal
        forceRender={true}
        onCancel={onCancel}
        onOk={onOk}
        okText={'Yes'}
        cancelText={'cancel'}
        confirmLoading={editLoading}
        title={'edit Task'}
        visible={!!editingTaskId}>
        <Form {...layout} initialValues={editingTask} form={form}>
            <Form.Item label={'task_name'} name={'name'} rules={[{ required: true, message: 'please input the task name' }]}>
                <Input />
            </Form.Item>
            <Form.Item label={'administrator'} name={'processorId'}>
                <UserSelect defaultOptionName={'administrator'} ></UserSelect>
            </Form.Item>
            <Form.Item label={'kind'} name={'typeId'} >
                <TaskTypeSelect />
            </Form.Item>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={startDelete} style={{ fontSize: '14px' }} size={"small"}>delete</Button>
            </div>
        </Form>

    </Modal>
}