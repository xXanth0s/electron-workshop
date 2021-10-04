export interface Message<T = undefined, R = void> {
    type: string;
    payload?: T;
}

export interface MessageCreator<T = undefined, R = void> {
    type: string;
    (data: T): Message<T, R>;
}
