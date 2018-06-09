import { addWatcherEpic } from './addWatcher';
import { combineEpics } from 'redux-observable';
import { agentsEpic } from './agents';
import { fetchWatchersEpic } from 'app/epics/fetchWatchers';

export const rootEpic = combineEpics(
    agentsEpic,
    fetchWatchersEpic,
    addWatcherEpic
);