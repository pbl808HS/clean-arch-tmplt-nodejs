import { Validators } from './../../../config/validators';
export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string
        ) {
    }

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {

        const { name, email, password } = object;

        if ( !name ) return ['Name field is required'];
        if ( !email ) return ['Email field is required'];
        if ( !Validators.email.test(email)) return ["Email field contains a not valid email"]
        if (!password ) return ['Password field is required'];
        if ( password.length < 6 ) return ['Password is too short'];

        return [
            undefined,
            new RegisterUserDto(
                name, email, password
            )
        ];
    }
}