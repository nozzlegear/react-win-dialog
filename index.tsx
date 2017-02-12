import * as React from 'react';
import * as Classes from "classnames";
import * as ReactDOM from "react-dom";
import Transition, { Transition as ITransition } from "react-motion-ui-pack";

export interface IProps extends React.Props<any> {
    /**
     * The dialog's title.
     */
    title: string;
    /**
     * Whether the dialog is open or not.
     */
    open: boolean;
    /**
     * Change's the dialog's outline and primary button color to red when true.
     */
    danger?: boolean;
    /**
     * The dialog's primary (right) button text.
     */
    primaryText?: string;
    /**
     * The dialog's secondary (left) button text.
     */
    secondaryText?: string;
    /**
     * Event handler called when the primary (right) button is clicked.
     */
    onPrimaryClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    /**
     *	Event handler called when the secondary (left) button is clicked.
     */
    onSecondaryClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export class Dialog extends React.Component<IProps, any>
{
    constructor(props: IProps) {
        super(props);
    }

    static propTypes: Record<keyof IProps, any> = {
        title: React.PropTypes.string.isRequired,
        open: React.PropTypes.bool.isRequired,
        children: React.PropTypes.element.isRequired,
        key: React.PropTypes.any,
        ref: React.PropTypes.any,
        danger: React.PropTypes.bool,
        primaryText: React.PropTypes.string,
        secondaryText: React.PropTypes.string,
        onPrimaryClick: React.PropTypes.func,
        onSecondaryClick: React.PropTypes.func,
    };

    /**
     * It's necessary to render the modal element in a layer that's a direct child of 
     * the body, to prevent the modal from getting constrained by parent element's 
     * dimensions or styles. This layer is the container.
     */
    private layer: HTMLDivElement;

    render() {
        return <noscript />;
    }

    componentDidMount() {
        // Appending to the body is easier than managing the z-index of
        // everything on the page.  It's also better for accessibility and
        // makes stacking a snap (since components will stack in mount order).
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount() {
        this.unrenderLayer();
        document.body.removeChild(this.layer);
    }

    private unrenderLayer() {
        ReactDOM.unmountComponentAtNode(this.layer);
    }

    private renderLayer() {
        const props = this.props;
        const buttons: JSX.Element[] = [];
        let body: JSX.Element = <div key={`react-win-dialog-empty`} />;

        if (typeof (props.secondaryText) === "string") {
            buttons.push(
                <button
                    key={`secondary-button`}
                    type={`button`}
                    className={`btn react-win-dialog-secondary-command`}
                    onClick={e => this.props.onSecondaryClick(e)}>
                    {props.secondaryText}
                </button>
            )
        }

        if (typeof (props.primaryText) === "string") {
            buttons.push(
                <button
                    key={`primary-button`}
                    type={`button`}
                    className={Classes(`btn react-win-dialog-primary-command`, { blue: !props.danger, red: props.danger })}
                    onClick={e => this.props.onPrimaryClick(e)}>
                    {props.primaryText}
                </button>
            )
        }

        if (props.open) {
            body = (
                <div key={`react-win-dialog-container`} className={`react-win-dialog-container`}>
                    <div className={Classes("react-win-dialog", { danger: props.danger || false })}>
                        <p className="react-win-dialog-title">{props.title}</p>
                        <div className="react-win-dialog-content">
                            {this.props.children}
                        </div>
                        <div className="react-win-dialog-footer">
                            {buttons}
                        </div>
                    </div>
                </div>
            );
        }

        const modal = (
            <Transition
                component={`div`}
                runOnMount={true}
                appear={{ opacity: 0, zIndex: 2000, translateX: 0, translateY: 20 }}
                enter={{ opacity: 1, zIndex: 2000, translateX: 0, translateY: 0 }}
                leave={{ opacity: 0, zIndex: 0, translateX: 0, translateY: 20 }}>
                {body}
            </Transition>
        );

        ReactDOM.render(modal, this.layer);
    }
}

export default Dialog;