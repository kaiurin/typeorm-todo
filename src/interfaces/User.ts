import {NextFunction, Request, Response} from "express";

export interface IUserPayload {
    lastName: string,
    firstName: string
}
export interface IUser {
    id: number,
    lastName: string,
    firstName: string
}

export interface IUserController {
    getAll(request: Request, response: Response, next: NextFunction): Promise<IUser[]>;
    getById(request: Request, response: Response, next: NextFunction): Promise<IUser>;
    create(request: Request, response: Response, next: NextFunction): Promise<IUserPayload>;
    remove(request: Request, response: Response, next: NextFunction): Promise<string>;
}
export interface IUserService {
    getAll(): Promise<IUser[]>;
    getById(id: number): Promise<IUser>;
    create(body: IUserPayload): Promise<IUserPayload>;
    remove(id: number): Promise<void>;
}
