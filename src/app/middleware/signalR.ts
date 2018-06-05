import * as SignalR from '@aspnet/signalr';
import { AgentActions } from 'app/actions';

const connection = new SignalR.HubConnectionBuilder().withUrl('http://localhost:5001/agents').build();

export function signalRRegisterCommands(store: any, callback: Function) {

    connection.on('NEW-AGENT-DISCOVERED', data => store.dispatch({ type: AgentActions.Type.ADD_AGENT, payload: data}));
    connection.on('AGENT-DISCONNECTED', data => store.dispatch({ type: AgentActions.Type.REMOVE_AGENT, payload: data}));

    connection.start().then(callback());

}