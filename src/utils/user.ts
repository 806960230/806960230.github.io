import { User } from "screens/project-list/search-panel";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";


export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    // ["project", param] 意思是当projects字符串变化或者param变化时，重新调用第二个参数的() => {}该方法, 但是projects字符串是个名字，相当于
    //缓存的key名，所以发生变化的主要是param，每当请求参数变化时，就发生第二个参数的函数调用
    client("users", { data: cleanObject(param || {}) }),
  );

  
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = () =>
  //   client("projects", { data: cleanObject(param || {}) });

  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param]);

  // return result;
};

export const useAddUsers = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
      (params: Partial<User>) =>
          client(`users`, {
              data: params,
              method: "POST",
          }),
      useAddConfig(queryKey));
}



export const useDeleteUsers = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
      ({ id }: { id: number }) =>
          client(`users/${id}`, {
              method: "DELETE",
          }),
      useDeleteConfig(queryKey));
}


// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();

//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//   }, [param]);

//   return result;
// };
