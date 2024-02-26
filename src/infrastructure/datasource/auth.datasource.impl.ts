import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entinties/user.entity';
import { CustomError } from '../../domain/errors/custom.error';
import { AuthDatasource } from '../../domain/datasources/auth.datasource';

export class AuthDatasourceImpl implements AuthDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            // TODO:
            // 1. Verificar si el correo existe
            // 2. Hash de la contraseña
            // 3. Mapear la respuesta a nuestra entidad

            return new UserEntity(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE']
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError;
        }
    }
}