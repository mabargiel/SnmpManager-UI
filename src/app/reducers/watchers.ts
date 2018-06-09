import { handleActions } from 'redux-actions';
import { RootState } from 'app/reducers';
import { WatcherActions } from 'app/actions';

const initialState: RootState.WatchersState = {
    watchers: [],
    fetching: false,
    error: null
}

export const watchersReducer = handleActions<RootState.WatchersState, any>(
    {
        [WatcherActions.Type.FETCH_WATCHERS]: (state, action) => {
            return {
                ...state, fetching: true
            };
        },

        [WatcherActions.Type.FETCH_WATCHERS_SUCCESS]: (state, action) => {
            if(action.payload) {
                return {
                    ...state,
                    fetching: false,
                    watchers: action.payload
                };
            }
            return state;
        },

        [WatcherActions.Type.FETCH_WATCHERS_FAILURE]: (state, action) => {
            if(action.payload) {
                return {
                    watchers: [], 
                    fetching: false, 
                    error: 'Could not load agent list. Try again later'
                };
            }
            return state;
        },

        [WatcherActions.Type.ADD_WATCHERS_SUCCESS]: (state, action) => {
            if(action.payload) {
                return {
                    ...state,
                    watchers: [...state.watchers, action.payload]
                };
            }
            return state;
        },

        [WatcherActions.Type.ADD_WATCHERS_FAILURE]: (state, action) => {
            if(action.payload) {
                return {
                    ...state,
                    error: action.payload
                };
            }
            return state;
        }
    },
    initialState
)