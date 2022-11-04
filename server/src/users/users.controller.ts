import { Controller, Get, Req, Res, Post, Header, Redirect, Query, Param, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @Get()
    @HttpCode(200)
    async getAllUsers(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<any> {
        return this.usersService.getAllUser();
    }
    
    // @Get(':id')
    // findOne(@Param() params, @Res() response): void {
    //     response.status(200).send(JSON.stringify({"message": `fake return user with id: ${params.id}`}))
    // }

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

    @Post('/authenticate')
    async authenticateUser(@Req() req: Request, @Res() res: Response): Promise<any> {
      const username = req.body.username;
      const password = req.body.password;
      const userData = await this.usersService.getUserByUsername(username);
      if(userData && await bcrypt.compare(password, userData.password)){
        res.status(HttpStatus.ACCEPTED);
        let token = this.jwtService.sign(
            { id: userData.id }, 
            { secret: process.env.JWT_SECRET }
        );
        res.cookie("jwt-token", token);
        res.send({
            "jwt-token": token,
            "message": "Authentication success!",
        });
       } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send({message: "Authentication failed, recheck username and password!"});
      }
    }

    @Get('verify')
    jwtVerify(@Req() req: Request, @Res() res: Response) {
        const jwtToken = req.cookies['jwt-token'];
        const verifyData = this.jwtService.verify(jwtToken, {secret: process.env.JWT_SECRET});
        res.status(HttpStatus.ACCEPTED);
        res.send(verifyData);
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
}
