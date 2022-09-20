import React from 'react';
import styles from './DialogsItem.module.css';
import {DialogsType} from '../../redux/store'
import {NavLink} from 'react-router-dom';

type PropsType = {
    dialogs: Array<any>
    // dialogs: Array<DialogsType>
}


export function DialogsItem(props: PropsType) {
    return (
        <div className={styles.names}>
            {props.dialogs.map((i)=>{
                return(
                    <div key={i.id}>
                        <NavLink to={"/dialogs/" + i.id}
                                 className={navData => navData.isActive ? styles.active : styles.item}>{i.name}</NavLink>
                    </div>
                )
            })}
        </div>
    )
};



