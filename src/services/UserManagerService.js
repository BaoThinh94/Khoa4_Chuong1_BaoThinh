import { ServiceBase } from "./ServiceBase";

export class UserManagerService extends ServiceBase {

    getAllUser = (user) => {
        return this.get(`Users/getUser?keyword=${user}`)
    }

    editUserInfor = (user) => {
        return this.put('Users/editUser', user)
    }

    deleteUser = (user) => {
        return this.delete(`Users/deleteUser?id=${user}`)
    }
}

export const userManagerService = new UserManagerService()