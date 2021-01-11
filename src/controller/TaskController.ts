import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Task} from "../entity/Task";

export class TaskController {

    private taskRepository = getRepository(Task);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.taskRepository.find();
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        return this.taskRepository.findOne(request.params.id);
    }

    async getByUserId(request: Request, response: Response, next: NextFunction) {
        return this.taskRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.taskRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.taskRepository.findOne(request.params.id);
        await this.taskRepository.remove(userToRemove);
    }

}