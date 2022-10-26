import { Controller, Get, Req, Res, Post, Header, Redirect, Query, Param, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Request, Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @HttpCode(200)
    async getAllUsers(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<any> {
        return this.usersService.getAllUser();
    }
    /*
    @Get(':id')
    findOne(@Param() params, @Res() response): void {
        response.status(200).send(JSON.stringify({"message": `fake return user with id: ${params.id}`}))
    }*/

    @Post('/create')
    @Header('Cache-Control', 'none')
    createUser(@Res({ passthrough: true }) response: Response, @Body() createUserDto: CreateUserDto): Object {
        response.status(HttpStatus.CREATED);
        return this.usersService.createUser(createUserDto);
    }
    /*
    @Get('/guide')
    @Redirect('https://nestjs.com', 301)
    redirectUser(@Res({ passthrough: true }) response: Response): void {}*/

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
}
