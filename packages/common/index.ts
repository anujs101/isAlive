export interface SignupIncomingMessage{
    publicKey:string,
    signedMessage:string,
    ip:string,
    callbackid:string
}
export interface ValidateIncomingMessage{
    callbackId:string,
    validatorId:string,
    websiteId:string,
    latency:number,
    status:'Good'|'Bad'|'unknown',
    signedMessage:string
}
export interface SignupOutgoingMessage{
    validatorId:string,
    callbackId:string
}
export interface ValidateOutgoingMessage{
    url:string,
    callbackId:string,
    websiteId:string
}
export type IncomingMessage={
    type : 'signup',
    data: SignupIncomingMessage
} | {
    type : 'validate',
    data :ValidateIncomingMessage
}
export type OutgoingMessage={
    type : 'signup',
    data: SignupOutgoingMessage
} | {
    type : 'validate',
    data :ValidateOutgoingMessage
}