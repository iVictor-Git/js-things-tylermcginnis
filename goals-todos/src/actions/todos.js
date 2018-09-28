import API, { deleteTodo } from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = todo => ({
  type: ADD_TODO,
  todo,
});

const removeTodo = id => ({
  type: REMOVE_TODO,
  id,
});

const toggleTodo = id => ({
  type: toggleTodo,
  id,
});

export const handleAddTodo = (name, callback) => dispatch =>
  API.saveTodo(name)
    .then(todo => dispatch(addTodo(todo)) || callback())
    .catch(() => alert('There was an error. Try again.'));

export const handleDeleteTodo = todo => dispatch =>
  dispatch(removeTodo(todo.id)) ||
  API.deleteTodo(todo.id).catch(
    () => dispatch(addTodo(todo)) || alert('An error occured. Try again.'),
  );

export const handleToggle = id => dispatch =>
  dispatch(toggleTodo(id)) ||
  API.saveTodoToggle(id).catch(() =>
    dispatch(toggleTodo(id) || alert('An error occurred. Try again')),
  );
