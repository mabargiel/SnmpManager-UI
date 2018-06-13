import * as React from "react";
import { WatcherModel } from "app/models/WatcherModel";
import { Watcher } from "app/components/Watcher";

export namespace WatcherList {
    export interface Props {
        watchers: WatcherModel[];
    }
}

export default class WatcherList extends React.Component<WatcherList.Props> {

    constructor(props: WatcherList.Props) {
        super(props);
        
        this.renderWatchers = this.renderWatchers.bind(this);
    }

    renderWatchers() {
        if(!this.props.watchers)
            return <div></div>;

        return this.props.watchers.map(watcher => <Watcher params={watcher}/>);
    }

    render() {
        return (
            <div>
                {this.renderWatchers()}
            </div>
        )
    }
}