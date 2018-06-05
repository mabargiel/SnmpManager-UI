import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';
import { epicMiddleware } from 'app/middleware/epics';
import { rootEpic } from 'app/epics';

export function configureStore(history: History, initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(routerMiddleware(history), logger, epicMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>; 

  epicMiddleware.run(rootEpic);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}