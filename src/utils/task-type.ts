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
} from "./use-optimistic-options";
import { Kanban } from "types/kanban";
import { Task } from "types/task";

export const useTaskTypes = () => {
    const client = useHttp();

    return useQuery<Task[], Error>(["taskTypes"], () => client("taskTypes", {}),
    );


};