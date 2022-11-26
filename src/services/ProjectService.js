import { ServiceBase } from "./ServiceBase";

export class ProjectService extends ServiceBase {

    getprojectDetail = (id) => {
        return this.get(`Project/getProjectDetail?id=${id}`)
    }
}

export const projectService = new ProjectService()