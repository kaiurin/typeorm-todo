import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {UserController} from "./controller/UserController";
import {TaskController} from "./controller/TaskController";

createConnection().then(async () => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (request: Request, response: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](request, response, next);
            if (result instanceof Promise) {
                result
                    .then(result => result !== null && result !== undefined ? response.send(result) : undefined)
                    .catch(error => response.send(error));
            }
        });
    });

    const userController = new UserController;
    const taskController = new TaskController;

    app.get('/users', userController.getAll);
    app.get('/users/:id', userController.getById);
    app.post('/users', userController.create);
    app.delete('/users/:id', userController.remove);

    app.get('/tasks', taskController.getAll);
    app.get('/users/:id/tasks', taskController.getAllTasksByUserId);
    app.get('/tasks/:id', taskController.getById);
    app.post('/tasks', taskController.create);
    app.delete('/tasks/:id', taskController.remove);

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
