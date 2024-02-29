import { UserModel } from "../../data/mongodb";
import { RegisterUserDto, UserEntity, CustomError, AuthDatasource } from '../../domain';
import { BcryptAdapter } from "../../config";
import {UserMapper} from "../mappers/user.mapper";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                console.log('User already exists');
                throw CustomError.badRequest('Error code E-401, please contact to or support team for more details');
            }

            // 2. Hash de la contraseña
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password)
            });

            await user.save();

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError;
        }
    }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {
            // 1. Verificar si el correo existe
            const userByEmail = await UserModel.findOne({ email });
            if (!userByEmail) {
                console.log('User don\'t exists');
                throw CustomError.badRequest('User not found');
            }
            // 2. comparar la contraseña
            const validPassword = this.comparePassword(password.toString(), userByEmail.password);
            if (!validPassword) {
                console.log('Password incorrect');
                throw CustomError.badRequest('The password is incorrect');
            }
            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(userByEmail);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError;
        }
    }
}