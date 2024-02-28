import { UserModel } from "../../data/mongodb";
import { RegisterUserDto, UserEntity, CustomError, AuthDatasource } from '../../domain';
import {BcryptAdapter} from "../../config";

export class AuthDatasourceImpl implements AuthDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            // TODO:
            // 1. Verificar si el correo existe
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) throw CustomError.badRequest('User already exists');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: BcryptAdapter.hash(password)
            });

            await user.save();
            // 2. Hash de la contraseña
            // 3. Mapear la respuesta a nuestra entidad

            // TODO:
            // 4. Mapear la respuesta
            return new UserEntity(
                user.id,
                name,
                email,
                user.password,
                user.roles
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError;
        }
    }
}