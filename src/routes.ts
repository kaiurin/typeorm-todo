import {UserController} from "./controller/UserController";
import {TaskController} from "./controller/TaskController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "getAll"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "getById"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/tasks",
    controller: TaskController,
    action: "getAll"
}, {
    method: "get",
    route: "/tasks/:id",
    controller: TaskController,
    action: "getById"
}, {
    method: "get",
    route: "/user/:id/tasks",
    controller: TaskController,
    action: "getAllTasksByUserId"
}, {
    method: "post",
    route: "/tasks",
    controller: TaskController,
    action: "create"
}, {
    method: "delete",
    route: "/tasks/:id",
    controller: TaskController,
    action: "remove"
}];