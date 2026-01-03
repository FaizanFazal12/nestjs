import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }
    async registerUser(registerDto: RegisterDto) {
        const findEmail = await this.userService.findByEmail(registerDto.email);
        if (findEmail) {
            throw new ConflictException({ message: 'User Email is already found' })
        }
        const hashPassword = await bcrypt.hash(registerDto.password, 10);

        let user = await this.userService.create({ ...registerDto, password: hashPassword })

        const payload = { sub: user._id };

        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passsed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        }
    }
    async loginUser(loginDto: LoginDto) {

        const user = await this.userService.findByEmail(loginDto?.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordMatch = await bcrypt.compare(loginDto?.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id };

        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passsed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        }

    }

}
