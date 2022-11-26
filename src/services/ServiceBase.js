import Axios from "axios"
import { TOKEN } from "../util/constants/settingSystem"

export class ServiceBase {

    get = (url) => {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    put = (url, model) => {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url) => {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    post = (url, model) => {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}


