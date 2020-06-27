import React, { useState, useEffect } from "react";
import api from "../api.js";
import TodoFormComponent from './todo-form-component';
import TaskListComponent from './task-list-component';

const TodoComponent = ({ user }) =>  {
  const [todos, setTodos] = useState([]);
  const [count, setCounter] = useState(0);

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      let todos = await api.getAllTodos();
      setTodos(todos);      
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async todo => {

    console.log('count', count);
    setCounter(count + 1);
    const newTask = { id: count, task: todo };
    if (!todo) {
      return;
    }
    const newTodo = await api.createTodo(newTask);
    setTodos(newTodo);
  };

  const deleteTodo = async (id, value) => {
    try {
      console.log(id, value);
      const newTodo = await api.deleteTodo(id);
      setTodos(newTodo);
    } catch (err) {}
  };

  return (
    <>
        <TodoFormComponent 
          updatedTaskList={createTodo}
        />
        <TaskListComponent 
          tasks={todos} 
          deleteTask={deleteTodo} 
          user={user}
        />
    </>
  );
}

export default TodoComponent;
