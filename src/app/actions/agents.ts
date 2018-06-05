import { createAction } from "redux-actions";

export namespace AgentActions {
    export enum Type {
        FETCH_AGENTS = 'FETCH_AGENTS',
        FETCH_AGENTS_SUCCESS = 'FETCH_AGENTS_SUCCESS',
        FETCH_AGENTS_FAILURE = 'FETCH_AGENTS_FAILURE',
        ADD_AGENT = 'ADD_AGENT',
        REMOVE_AGENT = 'REMOVE_AGENT'
    }

    export const fetchAgents = createAction(Type.FETCH_AGENTS);
}

export type AgentActions = Omit<typeof AgentActions, 'Type'>;