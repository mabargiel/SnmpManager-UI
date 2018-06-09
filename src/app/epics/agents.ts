import { AgentModel } from './../models/AgentModel';
import { AgentActions } from "app/actions/agents";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { of } from 'rxjs/internal/observable/of';

const fetchAgentsSuccess = (payload: AgentModel[]) => ({type: AgentActions.Type.FETCH_AGENTS_SUCCESS, payload});
const fetchAgentsFailure = (error: any) => ({type: AgentActions.Type.FETCH_AGENTS_FAILURE, error});

export const agentsEpic = (action$: any) =>
    action$.pipe(
        ofType(AgentActions.Type.FETCH_AGENTS),
        mergeMap((action: any) => 
            ajax.get('http://localhost:5001/api/agents')
                .pipe(
                    map(response => fetchAgentsSuccess(response.response)),
                    catchError(e => of(fetchAgentsFailure(e)))
                )
            )
        );

