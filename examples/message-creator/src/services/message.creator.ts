import {MessageCreator} from '../models/message.type';


export function createMessage<T = undefined, R = void>(type: string): MessageCreator<T, R> {
    const func = (payload: T) => ({
        type,
        payload
    })

    func.type = type;

    return func;
}
