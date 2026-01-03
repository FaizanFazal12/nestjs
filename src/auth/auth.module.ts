import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'Faizan',
    signOptions: { expiresIn: '360s' },
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
