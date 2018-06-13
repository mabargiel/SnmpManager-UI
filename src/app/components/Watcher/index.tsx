import * as React from "react";
import { WatcherModel } from "app/models/WatcherModel";

export namespace Watcher {
    export interface Props {
        params: WatcherModel;
    }
}

export class Watcher extends React.Component<Watcher.Props> {
    render() {
        return <div></div>
    }
}