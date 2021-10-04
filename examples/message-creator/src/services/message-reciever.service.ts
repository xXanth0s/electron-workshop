import {MessageCreator} from '../models/message.type';
import {ipcMain} from 'electron';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export function handleMessage<T, R>(creator: MessageCreator<T, R>, cb: (event: IpcMainInvokeEvent, data: T) => Promise<R> | R): void {
    ipcMain.handle(creator.type, cb);
}
