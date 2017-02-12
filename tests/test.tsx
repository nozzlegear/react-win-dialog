import * as React from "react";
import { render } from "react-dom";
import { spring } from "react-motion";
import Transition from "react-motion-ui-pack";
import Dialog from "../";

export interface IState {
    items?: { id: number }[];
    dialogOpen?: boolean;
}

export default class TestHarness extends React.Component<any, IState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [{
                id: Date.now(),
            }],
            dialogOpen: false,
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

    hideDialog() {
        this.setState({
            dialogOpen: false,
        }, () => {
            console.log(`Set dialogOpen to false.`)
        })
    }

    public render() {

        return (
            <div>
                <button onClick={e => this.addItem()}>{`Add Item`}</button>
                <button onClick={e => this.removeItem()}>{`Remove Item`}</button>
                <button onClick={e => this.setState({ dialogOpen: true })}>{`Open Dialog`}</button>
                <Transition
                    component={"ul"}
                    runOnMount={true}
                    appear={{ opacity: 0, translateY: 25 }}
                    enter={{ opacity: 1, translateY: spring(0, { stiffness: 400, damping: 10 }) }}
                    leave={{ opacity: 0, translateY: spring(25, { stiffness: 400, damping: 10 }) }}>
                    {this.state.items.map((item, index) => <li key={item.id}>{`Item ${index + 1}`}</li>)}
                </Transition>
                <Dialog
                    open={this.state.dialogOpen}
                    title={`React Win Dialog`}
                    primaryText={`Save Changes`}
                    secondaryText={`Close`}
                    onSecondaryClick={e => this.hideDialog()}>
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
            </div>
        );
    }
}

(function () {
    render(<TestHarness />, document.getElementById("contenthost"));
}());