import * as React from 'react';
import Dialog from '../';
import Transition from 'react-motion-ui-pack';
import { render } from 'react-dom';
import { spring } from 'react-motion';

export interface IState extends DialogState {
    items?: { id: number }[];
}

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
            items: [{
                id: Date.now(),
            }],
            "danger": false,
            "no-buttons": false,
            "one-button": false,
            "two-buttons": false,
            "no-animation": false,
        };
    }

    public state: IState;

    addItem() {
        const items = [...this.state.items];
        items.push({
            id: Date.now(),
        })

        this.setState({
            items,
        })
    }

    removeItem() {
        const items = [...this.state.items];
        items.splice(items.length - 1, 1)

        this.setState({
            items,
        })
    }

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
                onSecondaryClick={e => this.hideDialog(prop)}
                animate={prop !== "no-animation"}>
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
                <button onClick={e => this.addItem()}>{`Add Item`}</button>
                <button onClick={e => this.removeItem()}>{`Remove Item`}</button>
                {buttons}
                <Transition
                    component={"ul"}
                    runOnMount={true}
                    appear={{ opacity: 0, translateY: 25 }}
                    enter={{ opacity: 1, translateY: spring(0, { stiffness: 400, damping: 10 }) }}
                    leave={{ opacity: 0, translateY: spring(25, { stiffness: 400, damping: 10 }) }}>
                    {this.state.items.map((item, index) => <li key={item.id}>{`Item ${index + 1}`}</li>)}
                </Transition>
                {dialogs.map(type => this.buildDialog(type))}
            </div>
        );
    }
}

(function () {
    render(<TestHarness />, document.getElementById("contenthost"));
}());