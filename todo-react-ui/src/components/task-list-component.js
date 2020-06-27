import React from 'react';
import { ListGroup } from "react-bootstrap";
import TaskComponent from './task-component';

const TaskListComponent = ({ tasks, deleteTask, user }) => {
    const finalTodos = [].concat(...tasks);
    const taskItem = finalTodos.map((todo) => {
        return (<TaskComponent todo={todo} 
            key={todo.id} 
            remove={deleteTask} 
            user={user}
        />);
    });

    return <ListGroup>{taskItem}</ListGroup>;
};

export default TaskListComponent;