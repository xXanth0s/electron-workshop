import { messageCreator } from './messages.utils';

// Renderer
export const openAddToDoTaskPageMessage = messageCreator('openAddToDoTaskPage');

// Main
export const toDoTaskAddedMessage = messageCreator('toDoTaskAdded');

// Window Control
export const closeWindowMessage = messageCreator('closeWindow');

export const minimizeWindowMessage = messageCreator('minimzeWindow');

export const maximizeWindowMessage = messageCreator('maximizeWindow');
