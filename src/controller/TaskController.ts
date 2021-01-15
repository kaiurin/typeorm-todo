import {NextFunction, Request, Response} from "express";
import * as interfaces from "../interfaces/Task";
import {TaskService} from "../service/TaskService";

export class TaskController implements interfaces.ITaskController {
    private taskService = new TaskService();

    async getAll(request: Request, response: Response, next: NextFunction): Promise<interfaces.ITask[]> {
        try {
            return this.taskService.getAll();
        } catch (e) {
            return e
        }
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<interfaces.ITask> {
        try {
            return this.taskService.getById(request.params.id);
        } catch (e) {
            return e
        }
    }

    async getAllTasksByUserId(request: Request, response: Response, next: NextFunction): Promise<interfaces.ITask[]> {
        try {
            return this.taskService.getAllTasksByUserId(request.params.id);
        } catch (e) {
            return e
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<interfaces.ITask> {
        const body: interfaces.ITaskPayload = request.body;

        if (!body.title || !body.description || !body.userId) return response.status(400).send('Bad Request')

        try {
            return this.taskService.create({
                title: body.title,
                description: body.description,
                userId: body.userId
            });
        } catch (e) {
            return e
        }
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<string> {
        try {
            await this.taskService.remove(request.params.id);
            return 'Task successfully delete!';
        } catch (e) {
            return e
        }
    }
}