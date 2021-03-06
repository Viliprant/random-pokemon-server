import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LoginController } from './login/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RegistrationController } from './registration/registration.controller';
import { RefreshTokenGuard } from './refresh_token.guard';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { JWTOptions } from './JWTOptions';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync(JWTOptions),
  ],
  controllers: [LoginController, RegistrationController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenService,
    RefreshTokenGuard,
    JwtAuthGuard,
    UsersService,
  ],
  exports: [
    JwtAuthGuard,
    RefreshTokenGuard,
    RefreshTokenService,
    UsersService,
    AuthService,
  ],
})
export class AuthModule {}
