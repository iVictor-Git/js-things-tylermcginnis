import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

const addGoal = goal => ({
  type: ADD_GOAL,
  goal,
});

const removeGoal = id => ({
  type: REMOVE_GOAL,
  id,
});

export const handleAddGoal = (name, callback) => dispatch =>
  API.saveGoal(name)
    .then(goal => {
      dispatch(addGoal(goal));
      callback();
    })
    .catch(() => alert('There was an error. Try again.'));

export const handleDeleteGoal = goal => dispatch =>
  dispatch(removeGoal(goal.id)) ||
  API.deleteGoal(goal.id).catch(() =>
    dispatch(addGoal(goal) || alert('An error occured. Try again')),
  );
