import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import {
    useAddConfig,
    useDeleteConfig,
    useEditConfig,
    useReorderConfig,
} from "./use-optimistic-options";
import { Kanban } from "types/kanban";
import { Task } from "types/task";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();

    return useQuery<Task[], Error>(["tasks", param], () =>
        // ["project", param] 意思是当projects字符串变化或者param变化时，重新调用第二个参数的() => {}该方法, 但是projects字符串是个名字，相当于
        //缓存的key名，所以发生变化的主要是param，每当请求参数变化时，就发生第二个参数的函数调用
        client("tasks", { data: cleanObject(param || {}) }),
    );


};



export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey));
}


export const useTask = (id?: number) => {
    // const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const queryClient = useQueryClient();

    return useQuery<Project>(
        ["task", { id }],
        () => client(`tasks/${id}`, {}),
        {
            enabled: Boolean(id)
        }
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


export const useEditTask = (queryKey: QueryKey) => {

    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        useEditConfig(queryKey)
        // useEditConfig(queryKey),
    );
}


export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`tasks/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey));
}
export interface SortProps {

    type: 'before' | 'after',  // 放在目标item的前还是后
    referenceId: number;  // 目标item
    fromId: number  // 要重新排序的item
    fromKanbanId?: number,
    toKanbanId?: number
}
export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation((params: SortProps) => {
        return client('tasks/reorder', {
            data: params,
            method: 'POST'
        })
    },
        useReorderConfig(queryKey))
}