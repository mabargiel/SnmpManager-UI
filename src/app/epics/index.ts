import { combineEpics } from 'redux-observable';
import { agentsEpic } from './agents';

export const rootEpic = combineEpics(
    agentsEpic
);