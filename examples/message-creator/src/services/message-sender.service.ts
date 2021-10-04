import {Message} from '../models/message.type';

export function sendMessageToBackground<T, R>(message: Message<T, R>): Promise<R> {
    return window.require('electron').ipcRenderer.invoke(message.type, message);
}
