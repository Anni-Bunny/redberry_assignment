import axios, {AxiosInstance} from 'axios';
import {config} from "../../config.ts";

class API {

    public url: string
    public token: string
    public axios: AxiosInstance

    public constructor(url: string, token: string, timeout = 1000) {
        this.url = url;
        this.token = token;
        this.axios = axios.create({
            baseURL: url,
            timeout: timeout,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        })
    }

    getStatuses() {
        return this.axios.get('/statuses');
    }

    getPriorities() {
        return this.axios.get('/priorities');
    }

    getDepartments() {
        return this.axios.get('/departments');
    }

    getEmployees() {
        return this.axios.get('/employees');
    }

    createEmployee(data: FormData) {
        return this.axios.post('/employees', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }


    public getTasks(id?: number) {
        return this.axios.get('/tasks' + (id ? `/${id}` : ''));
    }

    public createTask() {
        return this.axios.post('/tasks', {});
    }

    public changeTaskStatus({id, status_id}: { id: number, status_id: number }) {
        return this.axios.put(`/tasks/${id}`, {
            'status_id': status_id
        });
    }

}

export const api = new API(config.url, config.token)