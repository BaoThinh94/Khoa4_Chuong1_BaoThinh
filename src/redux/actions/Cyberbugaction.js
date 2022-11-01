import { USER_LOGIN_CYBERBUG } from "../constants/CyberBugConst";

export const signInAction = (email, password) => {
    return {
        type: USER_LOGIN_CYBERBUG,
        userLogin: {
            email: email,
            password:password,
            
        }
    }
}