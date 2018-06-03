import * as React from "react";
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from './style.css';
import * as classNames from "classnames";
import { WatcherModel } from "app/models/WatcherModel";

export namespace WatchersView {
    export interface Props {
        watchers: WatcherModel[];
    }
}

const watchers = () => {
    return [{ipAddress: '192.168.1.103', mib: '1.2.45.56.1234.1.2.3', updatesEvery: 1000}, {ipAddress: '192.168.1.116', mib: '1.2.45.56.1234.1.2.3', updatesEvery: 1200}, {ipAddress: '192.168.1.116', mib: '1.2.45.56.1234.1.2.3', updatesEvery: 500}];
}

export default class WatchersView extends React.Component<WatchersView.Props & React.HTMLAttributes<HTMLDivElement>> {

    render() {
        return (
            <div className={styles.watchersContainer}>
                <div className={styles.topPanel}>
                    <button type="button" className={classNames(bootstrap.btn, bootstrap.btnPrimary)}>Add Watcher...</button>
                </div>
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