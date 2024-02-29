import { Validators } from './../../../config/validators';
export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string
        ) {
    }

    static login(object: {[key: string]: any}): [string?, LoginUserDto?] {

        const { email, password } = object;

        if ( !email ) return ['Email field is required'];
        if ( !Validators.email.test(email)) return ["Email field contains a not valid email"]
        if (!password ) return ['Password field is required'];
        if ( password.length < 6 ) return ['Password is too short'];

        return [
            undefined,
            new LoginUserDto(
                email, password
            )
        ];
    }
}