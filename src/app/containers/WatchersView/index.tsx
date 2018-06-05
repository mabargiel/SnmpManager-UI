import * as React from "react";
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './style.css';
import * as classNames from "classnames";
import { WatcherModel } from "app/models/WatcherModel";
import { AddWatcherModal } from "app/components/AddWatcherModal";
import { AgentModel } from "app/models";
import { connect } from "react-redux";
import { RootState } from "app/reducers";

export namespace WatchersView {
    export interface Props {
        agents: AgentModel[];
        watchers: WatcherModel[];
    }

    export interface State {
        modalIsOpen: boolean;
    }
}

const watchers = () => {
    return [{ipAddress: '192.168.1.103', mib: '1.2.45.56.1234.1.2.3', updatesEvery: 1000}, {ipAddress: '192.168.1.116', mib: '1.2.45.56.1234.1.2.3', updatesEvery: 1200}, {ipAddress: '192.168.1.117', mib: '1.2.45.56.1234.1.2.3', updatesEvery: 500}];
}

@connect(
    (state: RootState): Pick<WatchersView.Props, 'agents'> => {
      return { agents: state.agentList.agents };
    }
  )
export default class WatchersView extends React.Component<WatchersView.Props & React.HTMLAttributes<HTMLDivElement>, WatchersView.State> {

    constructor(props: WatchersView.Props) {
        super(props);
        
        this.openModal = this.openModal.bind(this);
        this.handleSubmitWatcher = this.handleSubmitWatcher.bind(this);

        this.state = {modalIsOpen: false};
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }

    handleSubmitWatcher(event: any, state: AddWatcherModal.State) {
        event.preventDefault();
        //this.props.actions.createSonar(state);
        if (this.state.modalIsOpen) {
          this.setState({ modalIsOpen: false });
        }
    }

    render() {
        return (
            <div className={styles.watchersContainer}>
                <div className={styles.topPanel}>
                    <button type="button" className={classNames(bootstrap.btn, bootstrap.btnPrimary)} onClick={this.openModal}>Add Watcher...</button>
                </div>
                <AddWatcherModal isOpen={this.state.modalIsOpen} agents={this.props.agents} onSubmit={this.handleSubmitWatcher}/>
                <table className={bootstrap.table}>
                    <thead className={bootstrap.theadDark}>
                        <tr>
                            <th scope="col">IP Address</th>
                            <th scope="col">MIB</th>
                            <th scope="col">Updates Every</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            watchers().map(watcher => {
                                return (
                                    <tr key={watcher.ipAddress}>
                                        <td>{watcher.ipAddress}</td>
                                        <td>{watcher.mib}</td>
                                        <td>{watcher.updatesEvery > 999 ? `${(watcher.updatesEvery / 1000).toFixed(2)} s` : `${watcher.updatesEvery} ms`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}