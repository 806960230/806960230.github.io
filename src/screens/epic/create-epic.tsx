import React from 'react'
import {Button, Drawer, Form, Input, Spin} from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import styled from '@emotion/styled';
import { useAddEpic } from 'utils/epic';
import { useEpicsQueryKey, useProjectIdInUrl } from './util';
import { ErrorBox } from 'components/lib';
import { UserSelect } from 'components/user-select';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import TextArea from 'antd/es/input/TextArea';

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & {onClose:() =>void}) => {

    const {mutate: addEpic, isLoading, error} = useAddEpic(useEpicsQueryKey());
    const [form] = useForm()
    const projectId = useProjectIdInUrl()
    const onFinish = async (values: any) => {
        await addEpic({...values, projectId})
        props.onClose()
    }
    useEffect(() => {
       form.resetFields()
    },[form, props.visible])
    return <Drawer
    visible={props.visible}
    onClose={props.onClose}
    forceRender={true}
    destroyOnClose={true}
    width={'100%'}
    >
      <Container>
      {isLoading ? (
          <Spin size={"large"}></Spin>
        ) : (
          <>
            <h1>create description</h1>
            <ErrorBox error={error} ></ErrorBox>
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"description"}
                name={"name"}
                rules={[{ required: true, message: "please input description" }]}
              >
                {/* <Input placeholder={"please input epic name"}></Input> */}
                <TextArea size="large" placeholder={"please input description"}></TextArea>
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading }
                  type={"primary"}
                  htmlType={"submit"}
                >
                  submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
}

export const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`