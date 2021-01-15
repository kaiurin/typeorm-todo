import {NextFunction, Request, Response} from "express";
import * as interfaces from "../interfaces/User";
import {UserService} from "../service/UserService";


export class UserController implements interfaces.IUserController{
    private userService = new UserService;

    async getAll(request: Request, response: Response, next: NextFunction):Promise<interfaces.IUser[]> {
        try {
            return this.userService.getAll();
        } catch (e) {
            return e
        }
    }

    async getById(request: Request, response: Response, next: NextFunction):Promise<interfaces.IUser> {
        try {
            return this.userService.getById(request.params.id);
        } catch (e) {
            return e
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<interfaces.IUserPayload> {
        const body: interfaces.IUserPayload = request.body;

        if(!body.lastName || !body.firstName) return response.status(400).send('Bad Request');

        return this.userService.create({
            lastName: body.lastName,
            firstName: body.firstName
        });
    }

    async remove(request: Request, response: Response, next: NextFunction):Promise<string> {
        try {
            await this.userService.remove(request.params.id);
            return 'User successfully delete!';
        } catch (e) {
            return e
        }
    }
}