import * as React from 'react';
import Classes from "classnames";
import { Dialog } from '../index';
import { createRoot } from 'react-dom/client';

export interface IState extends DialogState { }

export interface DialogState {
    "two-buttons"?: boolean;
    "one-button"?: boolean;
    "no-buttons"?: boolean;
    "no-animation"?: boolean;
    "danger"?: boolean;
    "long-body"?: boolean;
    "loading"?: boolean;
    "loading-component"?: boolean;
    "loading-function"?: boolean;
    "loading-dont-hide-buttons"?: boolean;
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
            "long-body": false,
            "loading": false,
            "loading-component": false,
            "loading-function": false,
            "loading-dont-hide-buttons": false
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
        const loading = ["loading",
            "loading-component",
            "loading-function",
            "loading-dont-hide-buttons"
        ].some(p => p === prop);
        const loadingComponent: React.JSX.ElementType | null = prop === "loading-component"
            ? "hello, this is a custom loading component wow" : prop === "loading-function"
            ? () => (<div>{"Custom loading component function"}</div>)
            : null;
        const loadingHidesButtons = prop === "loading-dont-hide-buttons" ? false : undefined;

        return (
            <Dialog
                key={prop}
                open={this.state[prop] === true}
                danger={prop === "danger"}
                title={`React Win Dialog`}
                loading={loading}
                loadingComponent={loadingComponent}
                loadingHidesButtons={loadingHidesButtons}
                primaryText={prop === "no-buttons" ? undefined : `Save Changes`}
                secondaryText={prop === "no-buttons" || prop === "one-button" ? undefined : `Close`}
                onSecondaryClick={e => this.hideDialog(prop)}
            >
                <p>{`Wolf kogi whatever cold-pressed.  Nihil artisan semiotics williamsburg nulla.`}</p>
                <div className={`control-group`}>
                    <label>{`Username`}</label>
                    <input type={`text`} placeholder={`john.doe@example.com`} />
                </div>
                <div className={`control-group`}>
                    <label>{`Password`}</label>
                    <input type={`password`} />
                </div>
                <div className={Classes({ "long-body": prop === "long-body" })} />
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
            "long-body",
            "loading",
            "loading-component",
            "loading-function",
            "loading-dont-hide-buttons"
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

((() => {
    const root = createRoot(document.getElementById("contenthost")!);
    root.render(<TestHarness />);
})());
