import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    getAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOneBy({username: username});
    }

    jwtVerify(jwtToken: string) {
        try {
            const verifyData = this.jwtService.verify(jwtToken, {secret: process.env.JWT_SECRET});
            if (verifyData) {
                const userData = this.userRepository.findOneBy({id: verifyData.id});
                console.log("jwtVerify userData", userData);
                if (userData) {
                    return true;
                }
            }
            return false;
        } catch(err) {
            console.log("UserService jwtVerify error", err);
            return false;
        }
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
            console.error("Save new user error", e);
        }
    }
}
