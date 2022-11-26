import { ServiceBase } from "./ServiceBase";

export class TaskService extends ServiceBase {

    getTaskCategory = () => {
        return this.get('Status/getAll')
    }

    getTaskPriorityCategory = () => {
        return this.get('Priority/getAll?id=0')
    }

    getAllProjectChosseTask = () => {
        return this.get('Project/getAllProject')
    }

    getTaskTypeAll = () => {
        return this.get('TaskType/getAll')
    }

    createTask = (task) => {
        return this.post('Project/createTask', task)
    }

    getTaskDetail = (taskID) => {
        return this.get(`Project/getTaskDetail?taskId=${taskID}`)
    }

    updateStatus = (status) => {
        return this.put(`Project/updateStatus`, status)
    }

    updateTask = (task) => {
        return this.post('Project/updateTask', task)
    }

    insertComment = (comment) => {
        return this.post('Comment/insertComment', comment)
    }

    removeUserFromTask = (user) => {
        return this.post('Project/removeUserFromTask', user)
    }

    removeTask = (taskID) => {
        return this.delete(`Project/removeTask?taskId=${taskID}`)
    }

    updateComment = (commentID, content) => {
        return this.put(`Comment/updateComment?id=${commentID}&contentComment=${content}`)
    }

    deleteComent = (commentID) => {
        return this.delete(`Comment/deleteComment?idComment=${commentID}`)
    }

}


export const taskService = new TaskService()