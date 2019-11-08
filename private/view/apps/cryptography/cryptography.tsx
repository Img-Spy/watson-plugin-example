import * as React               from "react";
import { connect }              from "react-redux";
import { bindActionCreators }   from "redux";

import { ResizePanel,
         ResizeModel,
         resizeActions }        from "watson-resize";

import State                    from "@public/state";
import { KeyInfo }              from "@public/modules/cryptography";

import "./cryptography.scss";


interface InputProps {
}

interface StateProps {
    selectedKey: KeyInfo;
    keys: { [k: string]: KeyInfo };
}

interface DispatchProps {
    actions: {
        initializeResize: (initial: ResizeModel) => void;
    };
}

type CryptographyProps = InputProps & StateProps & DispatchProps;

export class CryptographyClass extends React.Component<CryptographyProps> {
    public displayName = "Cryptography";

    constructor(props?: CryptographyProps, context?: any) {
        super(props, context);

        //
    }

    public componentWillMount() {
        this.props.actions.initializeResize({
            size: undefined,
            name: "cryptography",
            direction: "vertical",
            items: [
                { current: { value: 99, units: "percent" } },
                { current: { value: 1,  units: "percent" } },
            ]
        });
    }

    public render() {
        return (
            <ResizePanel name="cryptography" className="cryptography">
                <div className="key-list">
                    <span>List of keys:</span>
                    <ul>
                        { Object.keys(this.props.keys).map(
                            (keyPath, i) => <li key={keyPath}>{keyPath}</li>
                        )}
                    </ul>
                </div>
                <div>
                    <span>Selected key: { this.props.selectedKey ?
                        this.props.selectedKey.path : "No selected key" }
                    </span>
                </div>
            </ResizePanel>
        );
    }
}


export const Cryptography =
    connect<StateProps, DispatchProps, InputProps, State>(
        (state, props) => ({
            selectedKey: state.cryptography.selectedKey,
            keys: state.cryptography.keys
        }),
        (dispatch, props) => ({ actions: {
            initializeResize: bindActionCreators(resizeActions.initialize,
                dispatch)
        }})
)(CryptographyClass) as React.ComponentClass<InputProps>;
