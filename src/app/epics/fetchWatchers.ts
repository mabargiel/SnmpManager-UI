import { WatcherModel } from './../models/WatcherModel';
import { of } from 'rxjs/internal/observable/of';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { WatcherActions } from './../actions/watchers';
import { ofType } from 'redux-observable';

const fetchWatchersSuccess = (payload: WatcherModel[]) => ({type: WatcherActions.Type.FETCH_WATCHERS_SUCCESS, payload});
const fetchWatchersFailure = (error: any) => ({type: WatcherActions.Type.FETCH_WATCHERS_FAILURE, error});

export const fetchWatchersEpic = (action$: any) =>
    action$.pipe(
        ofType(WatcherActions.Type.FETCH_WATCHERS),
        mergeMap((action: any) => 
            ajax.get('http://localhost:5001/api/watchers')
                .pipe(
                    map(response => fetchWatchersSuccess(response.response)),
                    catchError(e => of(fetchWatchersFailure(e)))
                )
            )
        );