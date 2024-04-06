import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
import { useMemo } from "react";
import { ProjectModal } from "./project-modal";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Project } from "./list";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param],
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

// export const useUserModal = () => {
//   const open = () => setProjectCreate({ projectCreate: true });
//   return {
//     open
//   }
// }

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));
  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
      // setProjectCreate({ projectCreate: undefined });
  }
  // const close = () => {
  //   setProjectCreate({ projectCreate: undefined });
  //   setEditingProjectId({ editingProjectId: undefined });
  //   console.log('undeif',projectCreate, projectCreate === "true" )
  // };



  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };

  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`, {}),
    { // 配置参数， 这里指，id有值时才触发上面的函数
      enabled: Boolean(id),
    },
  );
};
