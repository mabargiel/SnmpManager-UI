import * as React from "react";
import AgentList from "app/components/AgentList";
import * as boot from 'bootstrap/dist/css/bootstrap.min.css';
import * as classNames from "classnames";
import { Link, Switch, Route } from 'react-router-dom'
import WatchersView from "app/containers/WatchersView";
import * as styles from './style.css';
import { RootState } from "app/reducers";
import { connect } from "react-redux";
import { AgentActions } from 'app/actions/agents';
import { Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { omit } from "app/utils";

export namespace App {
  export interface Props {
    agentListState: RootState.AgentsState;
    actions: AgentActions;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'agentListState'> => {
    return { agentListState: state.agentList };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(AgentActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {

  componentDidMount() {
    this.props.actions.fetchAgents();
  }

  render() {
    return (
      <div>
        <nav className={classNames(boot.navbar, boot.navbarDark, boot.bgDark)}>
          <Link to="/" className={boot.navbarBrand}>SNMP Manager</Link>
            <ul className={classNames(boot.navbarNav, boot.mrAuto, styles.navbarHorizontal)}>
              <li className={boot.navItem}>
                <Link to="/" className={boot.navLink}>Home</Link>
              </li>
              <li className={boot.navItem}>
                <Link to="/watchers/" className={boot.navLink}>Watchers</Link>
              </li>
            </ul>
        </nav>
        <div className={styles.flexDisplay}>
          <AgentList agents={this.props.agentListState.agents}/>
          <Switch>
              <Route path="/watchers" component={WatchersView}/>
          </Switch>
        </div>
      </div>
    )
  }
}