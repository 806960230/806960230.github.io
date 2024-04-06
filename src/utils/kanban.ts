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

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();

    return useQuery<Kanban[], Error>(["kanbans", param], () =>
        // ["project", param] 意思是当projects字符串变化或者param变化时，重新调用第二个参数的() => {}该方法, 但是projects字符串是个名字，相当于
        //缓存的key名，所以发生变化的主要是param，每当请求参数变化时，就发生第二个参数的函数调用
        client("kanbans", { data: cleanObject(param || {}) }),
    );
};

export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        (params: Partial<Kanban>) =>
            client(`kanbans`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey));
}


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

export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`kanbans/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey));
}
export interface SortProps {

    type: 'before' | 'after',  // 放在目标item的前还是后
    referenceId: number;  // 目标item
    fromId: number  // 要重新排序的item
}
export const useReorderKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation((params: SortProps) => {
        return client('kanbans/reorder', {
            data: params,
            method: 'POST'
        })
    }, useReorderConfig(queryKey))
}