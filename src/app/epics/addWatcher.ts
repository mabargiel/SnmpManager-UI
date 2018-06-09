import { WatcherModel } from './../models/WatcherModel';
import { of } from 'rxjs/internal/observable/of';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { WatcherActions } from './../actions/watchers';
import { ofType } from 'redux-observable';

const addWatcherSuccess = (payload: WatcherModel) => ({type: WatcherActions.Type.ADD_WATCHERS_SUCCESS, payload});
const addWatcherFailure = (error: any) => ({type: WatcherActions.Type.ADD_WATCHERS_FAILURE, error});

export const addWatcherEpic = (action$: any) =>
    action$.pipe(
        ofType(WatcherActions.Type.ADD_WATCHER),
        mergeMap((action: any) => 
            ajax.post('http://localhost:5001/api/watchers', action.payload, {'Content-Type': 'application/json'})
                .pipe(
                    map(response => addWatcherSuccess(response.response)),
                    catchError(e => of(addWatcherFailure(e)))
                )
            )
        );