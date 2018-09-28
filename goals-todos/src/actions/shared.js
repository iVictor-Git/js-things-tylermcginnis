import { fetchGoals, fetchTodos } from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

const receiveData = (todos, goals) => ({ type: RECEIVE_DATA, todos, goals });

export const handleInitialData = () => dispatch =>
  Promise.all([fetchTodos, fetchGoals]).then(([todos, goals]) =>
    dispatch(receiveData(todos, goals)),
  );
