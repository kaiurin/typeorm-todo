import {getRepository} from "typeorm";
import {Task} from "../entity/Task";
import {User} from "../entity/User";
import * as interfaces from "../interfaces/Task";
import {ITaskPayload} from "../interfaces/Task";

export class TaskService implements interfaces.ITaskService {
    private taskRepository = getRepository(Task);
    private userRepository = getRepository(User);

    async getAll(): Promise<interfaces.ITask[]> {
        return this.taskRepository.find();
    }

    async getById(id): Promise<interfaces.ITask> {
        let task: Task = await this.taskRepository.findOne(id);
        if (!task) throw 'Task not found!';
        return task
    }

    async getAllTasksByUserId(user_id): Promise<interfaces.ITask[]> {
        let user: User = await this.userRepository.findOne(user_id);

        if(!user) throw 'User not found!'

        return this.taskRepository.find({
            where: [{user}]
        });
    }

    async create(body: ITaskPayload): Promise<interfaces.ITask> {
        let user: User = await this.userRepository.findOne(body.userId);

        if(!user) throw 'User not found!'

        return this.taskRepository.save({
            title: body.title,
            description: body.description,
            user
        });
    }

    async remove(id): Promise<void> {
        let taskToRemove: Task = await this.taskRepository.findOne(id);
        if(!taskToRemove) throw 'Task not found!'
        await this.taskRepository.remove(taskToRemove);
    }
}