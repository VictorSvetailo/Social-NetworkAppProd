import React from 'react';
import styles from './Sidebar.module.css'
import {NavLink} from 'react-router-dom';
import {SidebarType} from '../redux/state';

type DataSidebarType = {
    sidebar: SidebarType
}

export function Sidebar(props: DataSidebarType) {
    let admin = props.sidebar.adminData
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <h4>{props.sidebar.title}</h4>
                {
                    admin.map((a)=>{
                        return (
                            <div key={a.id}>
                                <img src={a.photo} width='50px' alt=""/>
                                <div>{a.name}</div>
                                <div>{a.role}</div>
                            </div>
                        )
                    })
                }

                {
                    props.sidebar.menuTitle.map((m) => {
                        return (
                            <div key={m.id} className={`${styles.link}`}>
                                <NavLink to={m.url}
                                         className={navData => navData.isActive ? styles.active : styles.link}>
                                    {m.title}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
}

// <div className={styles.items}>
//     <div className={`${styles.link}`}><NavLink to="/profile" className={ navData => navData.isActive ? styles.active : styles.link} >Profile</NavLink></div>
//     <div className={`${styles.link} ${styles.active}`}><NavLink to="/dialogs" className={ navData => navData.isActive ? styles.active : styles.link}>Message</NavLink></div>
//     <div className={`${styles.link} ${styles.active}`}><NavLink to="/news" className={ navData => navData.isActive ? styles.active : styles.link}>News</NavLink></div>
//     <div className={`${styles.link} ${styles.active}`}><NavLink to="/music" className={ navData => navData.isActive ? styles.active : styles.link}>Music</NavLink></div>
//     <div className={`${styles.item} ${styles.active}`}><NavLink to="/sittings" className={ navData => navData.isActive ? styles.active : styles.item}>Sittings</NavLink></div>
// </div>