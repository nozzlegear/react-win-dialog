import * as React from "react";
import { render } from "react-dom";
import { spring } from "react-motion";
import Transition from "react-motion-ui-pack";

export interface IState {
    items: {id: number}[]
}

export default class Test extends React.Component<any, IState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [{
                id: Date.now(),
            }],
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

    public render() {
        
        return (
            <div>
                <button onClick={e => this.addItem()}>{`Add Item`}</button>
                <button onClick={e => this.removeItem()}>{`Remove Item`}</button>
                <Transition 
                    component={"ul"}
                    runOnMount={true} 
                    appear={{opacity: 0, translateY: 25}}
                    enter={{ opacity: 1, translateY: spring(0, {stiffness: 400, damping: 10}) }} 
                    leave={{ opacity: 0, translateY: spring(25, {stiffness: 400, damping: 10}) }}>
                    {this.state.items.map((item, index) => <li key={item.id}>{`Item ${index + 1}`}</li>)}
                </Transition>
            </div>
        );
    }
} 

(function () { 
    render(<Test />, document.getElementById("contenthost"));
}());