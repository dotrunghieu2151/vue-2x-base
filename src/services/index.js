import user from './user';
import apiService from './api';
import tasks from './tasks';

export const userService = user({ apiService });
export const taskService = tasks({ apiService });
