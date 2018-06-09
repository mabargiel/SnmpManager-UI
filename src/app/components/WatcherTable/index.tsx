import * as React from "react";
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import * as classNames from "classnames";
import * as styles from './style.css';
import { WatcherModel } from "app/models/WatcherModel";
import axios from 'axios';

export namespace WatcherTable {
    export interface Props {
        items: WatcherModel[],
        onItemSelected: (event: any, item: any) => void;
    }

    export interface State {
        selectedWatcher: WatcherModel | null;
    }
}

export class WatcherTable extends React.Component<WatcherTable.Props & React.HTMLAttributes<HTMLDivElement>, WatcherTable.State> {

    constructor(props: WatcherTable.Props) {
        super(props);

        this.state = {selectedWatcher: null};
    }

    componentDidUpdate(prevProps: WatcherTable.Props, prevState: WatcherTable.State) {
        if(this.state.selectedWatcher && prevState.selectedWatcher && prevState.selectedWatcher.id !== this.state.selectedWatcher.id)
            axios.delete(`http://localhost:5001/api/watcherConnections/${prevState.selectedWatcher.id}`)
                .then(() => {
                    if(this.state.selectedWatcher && this.state.selectedWatcher.id)
                        axios.post(`http://localhost:5001/api/watcherConnections/${this.state.selectedWatcher.id}`)
                            .then(() => !this.state.selectedWatcher || console.log(`WATCHER ${this.state.selectedWatcher.id} CONNECTED`));
                });
    }

    render() {
        return (
            <table className={classNames(bootstrap.table, bootstrap.tableHover, styles.containerItemAlign)}>
                    <thead className={bootstrap.theadDark}>
                        <tr>
                            <th scope="col">IP Address</th>
                            <th scope="col">MIB</th>
                            <th scope="col">Updates Every</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.items.map(item => {
                                return this.state.selectedWatcher === item ? (
                                    <tr key={item.ipAddress + item.mib} 
                                        className={bootstrap.tablePrimary} 
                                        onClick={e => {
                                            this.props.onItemSelected(e, item);
                                            this.setState({selectedWatcher: item});
                                        }}>
                                        <td>{item.ipAddress}</td>
                                        <td>{item.mib}</td>
                                        <td>{item.updatesEvery > 999 ? `${(item.updatesEvery / 1000).toFixed(2)} s` : `${item.updatesEvery} ms`}</td>
                                    </tr>
                                ) : (
                                    <tr key={item.ipAddress + item.mib} 
                                        onClick={e => {
                                            this.props.onItemSelected(e, item);
                                            this.setState({selectedWatcher: item});
                                        }}>
                                        <td>{item.ipAddress}</td>
                                        <td>{item.mib}</td>
                                        <td>{item.updatesEvery > 999 ? `${(item.updatesEvery / 1000).toFixed(2)} s` : `${item.updatesEvery} ms`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        )
    }
}