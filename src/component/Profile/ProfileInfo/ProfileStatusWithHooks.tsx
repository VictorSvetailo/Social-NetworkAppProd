import React, {MouseEvent, FocusEvent, ChangeEvent, FC, useState, useEffect} from 'react';


type PropsStatusType = {
    status: string
    updateStatus: (status: any) => void
}

export const ProfileStatusWithHooks: FC<PropsStatusType> = (props) => {

    const [active, setActive] = useState(false)
    const [text, setText] = useState(props.status)

    useEffect(() => {
        setText(props.status)
    }, [props.status])

    const activateEditMode = (e: MouseEvent<HTMLSpanElement>) => {
        setActive(!active)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const deactivateEditMode = (e: FocusEvent<HTMLInputElement>) => {
        setActive(!active)
        props.updateStatus(text)
    }

    return (
        <div>
            {!active &&
                <div><b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || 'Введите статус'}</span></div>
            }
            {active &&
                <div><input autoFocus onChange={onStatusChange} onBlur={deactivateEditMode} value={text}/></div>
            }

        </div>
    );
}
