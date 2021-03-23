import { ipcMain, ipcRenderer } from 'electron';

interface Task {
    id: string,
    title: string,
    description: string
}

interface ipcMessage<T, P = void> {
    type: string,
    payload: T
}

interface MessageCreator<T, P = void> {
    type: string,
    (T): ipcMessage<T, P>
}

export function messageCreator<T, P = void>(channel: string): MessageCreator<T, P> {
    const create = <T,P>(payload: T) => {
        return {
            type: channel,
            payload
        }
    }
    create.type = channel;
    return create
}

export const toggleToDoTaskMessage = messageCreator<{id: Task['id']}, Task>('toggleToDoTask');

export function invokeMessageToMain<T, P = void>(message: ipcMessage<T, P>): Promise<P> {
    return ipcRenderer.invoke(message.type, message);
}

ipcMain.handle(toggleToDoTaskMessage.type, (event, data: ReturnType<typeof toggleToDoTaskMessage>) => {});

invokeMessageToMain(toggleToDoTaskMessage({ id: '42' })).then(newTask => console.log(newTask))
