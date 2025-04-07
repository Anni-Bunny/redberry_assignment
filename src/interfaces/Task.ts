import {Department} from "./department.ts";
import {Employee} from "./employee.ts";
import {Status} from "./Status.ts";
import {Priority} from "./Priority.ts";

export interface Task {
    id: number;
    name: string;
    description?: string;
    due_date: string;
    department: Department;
    employee: Employee;
    status: Status;
    priority: Priority;
    total_comments: number;
}