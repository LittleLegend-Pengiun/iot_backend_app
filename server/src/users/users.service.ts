import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    ) {}

    getAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new User();
        newUser.username = createUserDto.username;
        newUser.age = createUserDto.age;
        newUser.email = createUserDto.email;
        newUser.password = createUserDto.password;

        try {
            const savedUser = await this.userRepository.save(newUser);
            console.log('New user save');
            return {"new user saved": savedUser};
        } catch (e) {
            console.error("Save new user error", e.getMessage());
        }
    }
}
