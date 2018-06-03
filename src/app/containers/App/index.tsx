import * as React from "react";
import AgentList from "app/components/AgentList";
import * as boot from 'bootstrap/dist/css/bootstrap.min.css';
import * as classNames from "classnames";
import { Link, Switch, Route } from 'react-router-dom'
import WatchersView from "app/containers/WatchersView";
import * as styles from './style.css';

const agents = () => {
  return [{ipAddress: '192.168.1.103', supportedVersion: '3'}, {ipAddress: '192.168.1.116', supportedVersion: '3'}, {ipAddress: '192.168.1.117', supportedVersion: '3'}];
}

export class App extends React.Component {
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
          <AgentList agents={agents()}/>
          <Switch>
              <Route path="/watchers" component={WatchersView}/>
          </Switch>
        </div>
      </div>
    )
  }
}