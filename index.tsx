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
     * Indicates that data is being loaded or saved.
     */
    loading?: boolean;
    /**
     * A custom component to use as the loading indicator when {@link Props.loading} is true.
     * @default `<progress />`
     */
    loadingComponent?: React.ReactNode | (() => React.ReactNode);
    /**
     * Whether the dialog should hide its primary and secondary buttons when {@link Props.loading} is true.
     * 
     */
    loadingHidesButtons?: boolean;
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
    const ignore = () => {};
    let modal: JSX.Element = <noscript />;

    // Save the body's default overflow so it can be reapplied when the modal is closed
    const defaultOverflow = React.useMemo(() => {
        if (props.open) {
            return document.body.style.overflow;
        }
    }, [props.open]);

    React.useEffect(() => {
        if (props.open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = defaultOverflow || "";
        }
    }, [props.open]);

    if (props.open) {
        const buttons: JSX.Element[] = [];
        // Default animate to true if the prop wasn't passed in.
        const animate = false
        const loading = props.loading ?? false;
        const loadingHidesButtons = props.loadingHidesButtons ?? true;

        const LoadingIndicator = () => {
            if (props.loading !== true) {
                return <React.Fragment />;
            }

            let indicator: React.ReactNode;

            if (props.loadingComponent === null || props.loadingComponent === undefined) {
                indicator = <progress className="react-win-dialog-loading-bar" />;
            }
            else if (typeof props.loadingComponent === "function") {
                indicator = props.loadingComponent();
            } else {
                indicator = props.loadingComponent;
            }

            return (
                <div className="react-win-dialog-loading-container">
                    {indicator}
                </div>
            )
        }

        if (loading === false || loadingHidesButtons === false) {
            if (typeof (props.secondaryText) === "string") {
                buttons.push(
                    <button
                        key={`secondary-button`}
                        type={`button`}
                        className={`btn react-win-dialog-secondary-command`}
                        onClick={props.onSecondaryClick || ignore}
                    >
                        {props.secondaryText}
                    </button>
                )
            }

            if (typeof (props.primaryText) === "string") {
                buttons.push(
                    <button
                        key={`primary-button`}
                        type={`button`}
                        className={Classes(`btn react-win-dialog-primary-command primary`, { danger: props.danger })}
                        onClick={props.onPrimaryClick || ignore}
                    >
                        {props.primaryText}
                    </button>
                )
            }
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
                        {props.children}
                        <LoadingIndicator />
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
