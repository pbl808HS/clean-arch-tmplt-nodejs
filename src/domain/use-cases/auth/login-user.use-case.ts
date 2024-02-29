import { JwtAdapter } from "../../../config/jwt";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { UserToken } from "../../interfaces/user-token.interface";
import { AuthRepository } from "../../repositories/auth.repository";
import { SignToken } from "../../types/sign-token.type";

interface LoginUserUseCaseInterface {
    excecute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUserUseCase implements LoginUserUseCaseInterface {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}
    async excecute(loginUserDto: LoginUserDto): Promise<UserToken> {
        // login usuario
        const user = await this.authRepository.login(loginUserDto);
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