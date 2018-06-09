import { AddWatcherModal } from 'app/components/AddWatcherModal';
import { createAction } from 'redux-actions';

export namespace WatcherActions {
    export enum Type {
        FETCH_WATCHERS = 'FETCH_WATCHERS',
        FETCH_WATCHERS_SUCCESS = 'FETCH_WATCHERS_SUCCESS',
        FETCH_WATCHERS_FAILURE = 'FETCH_WATCHERS_FAILURE',
        ADD_WATCHER = 'ADD_WATCHER',
        ADD_WATCHERS_SUCCESS = 'ADD_WATCHERS_SUCCESS',
        ADD_WATCHERS_FAILURE = 'ADD_WATCHERS_FAILURE'
    }

    export const fetchWatchers = createAction(Type.FETCH_WATCHERS);
    export const addWatcher = createAction<AddWatcherModal.State>(Type.ADD_WATCHER);
}

export type WatcherActions = Omit<typeof WatcherActions, 'Type'>;