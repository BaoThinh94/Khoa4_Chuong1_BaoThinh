import Axios from "axios";
import { DOMAIN_JIRA, TOKEN } from '../util/constants/settingSystem'

export class CyberbugService {


    loginUser = (userlogin) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Users/signin`,
            method: 'POST',
            data: userlogin
        })
    }

    getProjectCategory = () => {
        return Axios({
            url: `${DOMAIN_JIRA}/ProjectCategory`,
            method: 'GET',
        })
    }

    createProjectAuthorize = (newProject) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    getAllProject = () => {
        return Axios({
            url: `${DOMAIN_JIRA}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    deleteProject = (projectID) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Project/deleteProject?projectId=${projectID}`,
            method: 'DELETE',
            data: projectID,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    updateProject = (projectID, projectValue) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectID}`,
            method: 'PUT',
            data: projectValue,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    getUser = (value) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Users/getUser?keyword=${value}`,
            method: 'GET',
            data: value,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    assignUserProject = (user) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Project/assignUserProject`,
            method: 'POST',
            data: user,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    removeUserProject = (user) => {
        return Axios({
            url: `${DOMAIN_JIRA}/Project/removeUserFromProject`,
            method: 'POST',
            data: user,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}



export const cyberbugService = new CyberbugService()