import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Classes from "classnames";

export type Props = React.PropsWithChildren<{
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
}>

export function Dialog(props: Props): JSX.Element {
    let modal: JSX.Element = <noscript />;

    if (props.open) {
        const buttons: JSX.Element[] = [];
        // Default animate to true if the prop wasn't passed in.
        const animate = false

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

        modal = (
            <div>
                {body}
            </div>
        )
    }

    const modalContainer = (
        <div 
            className={Classes(`react-win-dialog-overlay`, { open: props.open })} 
            style={props.overlayStyle}
        >
            {modal}
        </div>
    )

    return ReactDOM.createPortal(
        modalContainer,
        document.body
    );
}
