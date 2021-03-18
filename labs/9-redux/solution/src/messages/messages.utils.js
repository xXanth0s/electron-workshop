import { ipcRenderer } from 'electron';

export function sendMessageToMain(message) {
  return ipcRenderer.send(message.type, message);
}


export function messageCreator(type = '') {
  const create = (payload) => {
    return {
      type,
      payload
    }
  }

  create.type = type;

  return create
}
