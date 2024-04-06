import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryClient, QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () => client("projects", { data: param}),
    // ["project", param] 意思是projects为缓存的key字段，第二个参数param是用来观察param变化，一旦变化就重新自动调用，重新调用第二个参数的() => {}该方法, 但是projects字符串是个名字，相当于
    //缓存的key名，所以发生变化的主要是param，每当请求参数变化时，就发生第二个参数的函数调用
  );
 
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = () =>
  //   client("projects", { data: cleanObject(param || {}) });

  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param]);

  // return result;
};

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`, {}),
    {  // 只有id存在值时，才出发请求
      enabled: Boolean(id)
    }

  )
}


export const useEditProject = (queryKey: QueryKey) => {

  const client = useHttp();
  // 乐观更新最初版本（需要删掉useEditProject里的参数queryKey才算）
  // const queryKey = ['projects', searchParams]  // 拿到缓存的对应的key
  // return useMutation(
  //   (params: Partial<Project>) =>
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     }),
  //     {
  //       onSuccess: () => queryClient.invalidateQueries(queryKey),
  //       //乐观更新
  //       async onMutate(target) {  // 这个函数，一旦useMutation发生，这个onMutate就触发
  //         const previousItems = queryClient.getQueryData(queryKey) // 取得key对应的value值
  //         queryClient.setQueryData(queryKey, (old?: Project[]) => {
  //           return old?.map(project => project.id === target.id ? {...project, ...target}: project) || []
  //         })
  //         return {previousItems}  // 这里是作为onError发生后才赋值的
  //       },
  //       onError(error, newItem, context:any) {  // 这里是作为乐观更新的回滚机制而使用，意思是，当useMutation请求不成功的时候，我们不能直接乐观更新
  //           queryClient.setQueryData(queryKey, context.previousItems)
  //       }
  //     }
  // );

  // 把乐观更新封装了后的版本:

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey),
  );

  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     }),
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useDeleteProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  // const queryClient = useQueryClient();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }), {
        onSuccess:() => queryClient.invalidateQueries('projects')
      }
    // useAddConfig(queryKey),
  );
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     }),
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};