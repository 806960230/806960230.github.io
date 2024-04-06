import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/es/form/Form";
import styled from "@emotion/styled";
import { ErrorBox } from "components/lib";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal();
  const title = editingProject ? "edit project" : "create project";
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
      // window.location.reload();
    });
  };
  const closeModal = () => {
    form.resetFields()
    console.log('没关闭吗')
    close()
  }
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"}></Spin>
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} ></ErrorBox>
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"name"}
                name={"name"}
                rules={[{ required: true, message: "please input project's name" }]}
              >
                <Input placeholder={"please input project's name"}></Input>
              </Form.Item>
              <Form.Item
                label={"organization"}
                name={"organization"}
                rules={[{ required: true, message: "please input organization's name" }]}
              >
                <Input placeholder={"please input organization's name"}></Input>
              </Form.Item>
              <Form.Item label={"administrator"} name={"personId"}>
                <UserSelect defaultOptionName={"administrator"}></UserSelect>
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
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
  );
};

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
