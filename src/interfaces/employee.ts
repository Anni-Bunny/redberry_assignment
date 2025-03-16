import {Department} from "./department.ts";

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: Department;
}