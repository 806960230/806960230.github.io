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
import { Task } from "types/task";
import { Epic } from "types/epic";

export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();

    return useQuery<Epic[], Error>(["epics", param], () =>
        // ["project", param] 意思是当projects字符串变化或者param变化时，重新调用第二个参数的() => {}该方法, 但是projects字符串是个名字，相当于
        //缓存的key名，所以发生变化的主要是param，每当请求参数变化时，就发生第二个参数的函数调用
        client("epics", { data: cleanObject(param || {}) }),
    );
};

export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        (params: Partial<Epic>) =>
            client(`epics`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey));
}



export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`epics/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey));
}

