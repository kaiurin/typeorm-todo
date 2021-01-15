import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export interface ITaskPayload {
    title: string,
    description: string,
    userId: number
}
export interface ITask {
    id: number,
    title: string,
    description: string,
    user: User
}

export interface ITaskController {
    getAll(request: Request, response: Response, next: NextFunction): Promise<ITask[]>;
    getById(request: Request, response: Response, next: NextFunction): Promise<ITask>;
    getAllTasksByUserId(request: Request, response: Response, next: NextFunction): Promise<ITask[]>;
    create(request: Request, response: Response, next: NextFunction): Promise<ITask>;
    remove(request: Request, response: Response, next: NextFunction): Promise<string>;
}
export interface ITaskService {
    getAll(): Promise<ITask[]>;
    getById(id: number): Promise<ITask>;
    getAllTasksByUserId(id: number): Promise<ITask[]>;
    create(body: ITaskPayload): Promise<ITask>;
    remove(id: number): Promise<void>;
}
