import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const getAllUsers = async () => {
    return await axios.get(usersUrl);
}

const getUserTodos = async (userId) => {
    return await axios.get(`${todosUrl}?userId=${userId}`);
}

export { getAllUsers, getUserTodos };
