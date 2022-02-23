# react-win-dialog
An attempt to recreate the Dialog element from WinJS, with full TypeScript definitions.

![Screeshot of React Win Dialog](https://i.imgur.com/l20vhNe.png)

## Installation

With [Yarn](https://github.com/yarnpkg/yarn):

```shell
yarn install react-win-dialog
```

Or from [NPM](https://npmjs.com/package/react-win-dialog):

```shell
npm install react-win-dialog --save
```

## Importing

Import React-Win-Dialog via ES6 default import:

```js
import Dialog from "react-win-dialog";
```

Or via Node's require:

```js
const Dialog = require("react-win-dialog").default;
```

## Example

```js
import Dialog from "react-win-dialog";

render() {
    return (
        <Dialog
            open={this.state.dialogOpen}
            title={`React Win Dialog`}
            primaryText={`Save Changes`}
            secondaryText={`Close`}
            onSecondaryClick={e => this.setState({dialogOpen: false})}>
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
```

## Props

Note: React-Win-Dialog has full TypeScript definitions! You should automatically receive intellisense for all of the props documented below:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | true | The dialog's title. |
| `open` | boolean | true | Whether the dialog is open or not. |
| `children` | element | true | The dialog's content body. |
| `danger` | boolean | false | Change's the dialog's outline and primary button color to red when true. |
| `primaryText` | string | false | The dialog's primary (right) button text. |
| `secondaryText` | string | false | The dialog's secondary (left) button text. |
| `onPrimaryClick` | function | false | Event handler called when the primary (right) button is clicked. |
| `onSecondaryClick` | function | false | Event handler called when the secondary (left) button is clicked. |
| `loading` | boolean | false | Indicates that data is being loaded or saved. Default `false`. |
| `loadingComponent` | React.ReactNode | false | A custom component to use as the loading indicator when `loading` is true. Defaults to a `<progress />` element. |
| `loadingHidesButtons` | boolean | false | Whether the dialog should hide its primary and secondary buttons when `loading` is true. Defaults to `true`.|
| `overlayStyle` | object | false | CSS style object applied to the overlay container. |
| `containerStyle` | object| false | CSS style object applied to the dialog container. |
| `dialogStyle` | object | false | CSS style object applied to the dialog. |
| `id` | string | false | Element id applied to the dialog container. |
| `className` | string | false | CSS classnames applied to the dialog container. |

## Styling

If you'd like to style the modal buttons yourself, just use the following CSS rules:

```css
.react-win-dialog-overlay {
    /* This styles the semi-transparent background overlay.
     * Note that the dialog itself is *not* a child of this element.
     */
}

.react-win-dialog-container .react-win-dialog .btn.react-win-dialog-secondary-command {
    /* This styles the secondary (left) button. */
}

.react-win-dialog-container .react-win-dialog .btn.primary.react-win-dialog-primary-command {
    /* This styles the primary (primary) button. */
}

.react-win-dialog-container .react-win-dialog.danger {
    /* This styles the dialog when `danger=true` is passed to the component. */
}

.react-win-dialog-container .react-win-dialog.danger .btn.danger.react-win-dialog-primary-command {
    /* This styles the primary (right) button when `danger=true` is passed to the component. */
}

.react-win-dialog-container .react-win-dialog .react-win-dialog-content .react-win-dialog-loading-container {
    /* This styles the loading indicator container when `loading=true` is passed to the component. */
}

.react-win-dialog-container .react-win-dialog .react-win-dialog-content .react-win-dialog-loading-container progress.react-win-dialog-loading-bar {
    /* This styles the default progress bar used as the loading indicator when `loading=true` is passed to the component without a custom loading indicator component. */
}
```
