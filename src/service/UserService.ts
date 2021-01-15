import {getRepository, Repository} from "typeorm";
import {User} from "../entity/User";
import * as interfaces from "../interfaces/User";

export class UserService implements interfaces.IUserService {

    private userRepository: Repository<User> = getRepository(User);

    async getAll(): Promise<interfaces.IUser[]> {
        return this.userRepository.find();
    }

    async getById(id: number): Promise<interfaces.IUser> {
        let user: User = await this.userRepository.findOne(id,{
            relations: ["tasks"]
        });
        if (!user) throw 'User not found!';

        return user
    }

    async create(body: interfaces.IUserPayload): Promise<interfaces.IUserPayload> {
        return this.userRepository.save({
            lastName: body.lastName,
            firstName: body.firstName
        });
    }

    async remove(id: number): Promise<void> {
        let userToRemove: User = await this.userRepository.findOne(id);
        if(!userToRemove) throw 'User not found!'

        await this.userRepository.remove(userToRemove);
    }
}