import { JwtAdapter } from '../../../config/jwt';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { UserToken } from '../../interfaces/user-token.interface';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken } from '../../types/sign-token.type';

interface RegisterUserUseCaseInterface {
    excecute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUserUseCase implements RegisterUserUseCaseInterface {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}
    async excecute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        // crear usuario
        const user = await this.authRepository.register(registerUserDto);
        // token
        const token = await this.signToken({id: user.id}, '2h');
        if (!token) throw CustomError.internalServerError('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}