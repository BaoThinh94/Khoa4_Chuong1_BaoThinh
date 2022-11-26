import { ServiceBase } from "./ServiceBase";

export class SignUpService extends ServiceBase {
    signUp = (user) => {
        return this.post('Users/signup', user)
    }
}

export const signUpService = new SignUpService()