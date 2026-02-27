import * as taskRepository from "../repositories/tasksRepository.js";
import { endOfDay, startOfDay, parseISO, isValid } from "date-fns";

export async function getTasks(query, userId) {
    const { page = 1, limit = 10, status, from, to } = query;
    const filter = {  deletedAt: null };

    if (userId) {
        filter.user = userId;
    }

    if (status) {
        filter.completed = status === "completed";
    }
    if (from && to) {
        const fromDate = parseISO(String(from));
        const toDate = parseISO(String(to));

        if (isValid(fromDate) && isValid(toDate)) {
            const fromBound = String(from).includes("T") ? fromDate : startOfDay(fromDate);
            const toBound = String(to).includes("T") ? toDate : endOfDay(toDate);
            filter.date = { $gte: fromBound, $lte: toBound };
        }
    }
    const tasks = await taskRepository.getTasks(filter, page, limit);
    return tasks;
}

export async function createTask(data, userId) {
    data.user = userId;
    const task = await taskRepository.createTask(data);
    return task;
}

export async function getTaskById(id, userId) {
    const task = await taskRepository.getTaskById(id, userId);
    return task;
}

export async function updateTask(id, data, userId) {
    const task = await taskRepository.updateTask(id, data, userId);
    return task;
}

export async function deleteTask(id, userId) {
    const task = await taskRepository.softDeleteTask(id, userId);
    return task;
}

