import { messageCreator } from './messages.utils';

// Renderer
export const openAddToDoTaskPageMessage = messageCreator('openAddToDoTaskPage');

export const addToDoTaskMessage = messageCreator('addToDoTask');

export const toggleToDoTaskMessage = messageCreator('toggleToDoTask');

export const getAllToDoTasks = messageCreator('getAllToDoTasks');


// Main
export const toDoTaskAddedMessage = messageCreator('toDoTaskAdded');
