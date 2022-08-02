import React from 'react';
import styles from './DialogsItem.module.css';
import state from '../../redux/state'
import {NavLink} from 'react-router-dom';

export function DialogsItem() {

    return (
        <div className={styles.names}>
            {state.dialogsPage.dialogs.map((i)=>{
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



