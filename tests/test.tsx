import * as React from 'react';
import { Dialog } from '../index';
import { render } from 'react-dom';

import "../dist/all.css";
import "../node_modules/utilities.styl/all.css";

export interface IState extends DialogState { }

export interface DialogState {
    "two-buttons"?: boolean;
    "one-button"?: boolean;
    "no-buttons"?: boolean;
    "no-animation"?: boolean;
    "danger"?: boolean;
}

type DialogProp = keyof DialogState;

export default class TestHarness extends React.Component<any, IState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            "danger": false,
            "no-buttons": false,
            "one-button": false,
            "two-buttons": false,
            "no-animation": false,
        };
    }

    public state: IState;

    private openDialog(prop: DialogProp) {
        this.setState({
            [prop]: true,
        });
    }

    private hideDialog(prop: DialogProp) {
        this.setState({
            [prop]: false,
        });
    }

    private buildDialog(prop: DialogProp) {

        return (
            <Dialog
                key={prop}
                open={this.state[prop] === true}
                danger={prop === "danger"}
                title={`React Win Dialog`}
                primaryText={prop === "no-buttons" ? undefined : `Save Changes`}
                secondaryText={prop === "no-buttons" || prop === "one-button" ? undefined : `Close`}
                onSecondaryClick={e => this.hideDialog(prop)}>
                <p>{`Wolf kogi whatever cold-pressed.  Nihil artisan semiotics williamsburg nulla.`}</p>
                <div className={`control-group`}>
                    <label>{`Username`}</label>
                    <input type={`text`} placeholder={`john.doe@example.com`} />
                </div>
                <div className={`control-group`}>
                    <label>{`Password`}</label>
                    <input type={`password`} />
                </div>
            </Dialog>
        )
    }

    public render() {
        const dialogs: DialogProp[] = [
            "two-buttons",
            "one-button",
            "no-buttons",
            "no-animation",
            "danger",
        ]
        const buttons = dialogs.map(type =>
            <button
                key={type}
                type={`button`}
                onClick={e => this.openDialog(type)}>
                {`Open ${type} dialog`}
            </button>
        );

        return (
            <div>
                {buttons}
                {dialogs.map(type => this.buildDialog(type))}
            </div>
        );
    }
}

(function () {
    render(<TestHarness />, document.getElementById("contenthost"));
}());
