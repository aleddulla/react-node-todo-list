import axios from "axios";

export const API_URL="http://localhost:4200/tasks/";
async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task
  });
  return newTodo;
}

async function deleteTodo(id) {
  const { data: newTodo } = await axios.delete(`${API_URL}${id}`);
  return newTodo;
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

export default { createTodo, deleteTodo, getAllTodos };
