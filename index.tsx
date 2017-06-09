import * as Classes from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Transition, { Transition as ITransition } from 'react-motion-ui-pack';

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

    /**
     * Style object applied to the dialog's overlay.
     */
    overlayStyle?: React.CSSProperties;

    /**
     * Style object applied to the dialog container.
     */
    containerStyle?: React.CSSProperties;

    /**
     * Style object applied to the dialog.
     */
    dialogStyle?: React.CSSProperties;

    /**
     * Id applied to the dialog container.
     */
    id?: string;

    /**
     * Classname applied to the dialog container.
     */
    className?: string;

    /**
     * Set to false to turn off animations. Defaults to true.
     */
    animate?: boolean;
}

export class Dialog extends React.Component<IProps, any>
{
    constructor(props: IProps) {
        super(props);
    }

    static propTypes: Partial<Record<keyof IProps, any>> = {
        title: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element).isRequired]) ,
        ref: PropTypes.any,
        danger: PropTypes.bool,
        primaryText: PropTypes.string,
        secondaryText: PropTypes.string,
        onPrimaryClick: PropTypes.func,
        onSecondaryClick: PropTypes.func,
        overlayStyle: PropTypes.object,
        containerStyle: PropTypes.object,
        dialogStyle: PropTypes.object,
        id: PropTypes.string,
        className: PropTypes.string,
        animate: PropTypes.bool,
    };

    /**
     * It's necessary to render the modal element in a layer that's a direct child of 
     * the body, to prevent the modal from getting constrained by parent element's 
     * dimensions or styles. This layer is the container.
     */
    private layer: HTMLDivElement;
    private overlayContainer: HTMLDivElement;

    render() {
        return <noscript />
    }

    componentDidMount() {
        // Appending to the body is easier than managing the z-index of
        // everything on the page.  It's also better for accessibility and
        // makes stacking a snap (since components will stack in mount order).
        this.layer = document.createElement('div');
        this.overlayContainer = document.createElement('div');

        document.body.appendChild(this.layer);
        document.body.appendChild(this.overlayContainer);

        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount() {
        this.unrenderLayer();
        document.body.removeChild(this.layer);
        document.body.removeChild(this.overlayContainer);
    }

    private unrenderLayer() {
        ReactDOM.unmountComponentAtNode(this.layer);
        ReactDOM.unmountComponentAtNode(this.overlayContainer);
    }

    private renderLayer() {
        const props = this.props;
        let modal: JSX.Element = <noscript />;


        if (props.open) {
            const buttons: JSX.Element[] = [];
            // Default animate to true if the prop wasn't passed in.
            const animate = typeof(props.animate) === "undefined" || props.animate === null ? true : props.animate;

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

            const body = (
                <div
                    id={props.id}
                    key={`react-win-dialog-container`}
                    className={Classes(`react-win-dialog-container`, props.className)}
                    style={props.containerStyle}>
                    <div
                        className={Classes("react-win-dialog", { danger: props.danger || false })}
                        style={props.dialogStyle}>
                        <p className="react-win-dialog-title">{props.title}</p>
                        <div className="react-win-dialog-content">
                            {this.props.children}
                        </div>
                        <div className="react-win-dialog-footer">
                            {buttons}
                        </div>
                    </div>
                </div>
            )

            if (animate) {
                modal = (
                    <Transition
                        component={`div`}
                        runOnMount={true}
                        appear={{ translateX: 0, translateY: 20 }}
                        enter={{ translateX: 0, translateY: 0 }}
                        leave={{ translateX: 0, translateY: 20 }}>
                        {body}
                    </Transition>
                );
            } else {
                modal = (
                    <div>
                        {body}
                    </div>
                )
            }

        }

        const overlay = <div className={Classes(`react-win-dialog-overlay`, { open: props.open })} style={props.overlayStyle} />;

        ReactDOM.render(overlay, this.overlayContainer);
        ReactDOM.render(modal, this.layer);
    }
}

export default Dialog;