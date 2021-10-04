import {createMessage} from '../services/message.creator';

export const testMessage = createMessage<string, string>('testMessage');
