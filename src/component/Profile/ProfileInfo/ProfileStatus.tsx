import React, {MouseEvent, FocusEvent, ChangeEvent} from 'react';


type PropsStatusType = {
    status: string
    updateStatus: (status: any) => void
}

export class ProfileStatus extends React.Component<PropsStatusType, any> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = (e: MouseEvent<HTMLSpanElement>) => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = (e: FocusEvent<HTMLInputElement>) => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Record<string, unknown>, prevState: Record<string, unknown>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div><span onDoubleClick={this.activateEditMode}>{this.props.status || 'Введите статус'}</span>
                    </div>}
                {this.state.editMode &&
                    <div><input autoFocus onChange={this.onStatusChange} onBlur={this.deactivateEditMode}
                                value={this.state.status} type="text"/>
                    </div>}
            </div>
        );
    };
}


// const [editMode, setEditMode] = useState(true)
// const [textStatus, setTextStatus] = useState(this.props.statusText)
//
// const onclickTextHandler = (e: MouseEvent<HTMLDivElement>) => {
//     setEditMode(!editMode)
// }
// const onBlurInputHandler = (e: FocusEvent<HTMLInputElement>) => {
//     if (e.currentTarget.value.trim() !== '') {
//         setEditMode(!editMode)
//     } else {
//         setTextStatus('Введите статут')
//     }
// }
// const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTextStatus(e.currentTarget.value)
// }
//
// return (
//     <div>
//         {editMode
//             ? <div>
//                 <div onClick={onclickTextHandler}>{textStatus || 'Введите статут'}</div>
//             </div>
//             : <div><input onChange={onChangeTextHandler} onBlur={onBlurInputHandler} value={textStatus}
//                           type="text"/></div>
//         }
//     </div>
// );
// };