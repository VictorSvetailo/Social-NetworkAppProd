import React from 'react';
import styles from './Sidebar.module.css'
import {NavLink} from 'react-router-dom';
import {SidebarType} from '../redux/store';

type DataSidebarType = {
    sidebar: SidebarType
}

export function Sidebar(props: DataSidebarType) {

    // function map
    let admin = props.sidebar.adminData.map((a) => {
        return (
            <div key={a.id}>
                <img src={a.photo} width="50px" alt=""/>
                <div>{a.name}</div>
                <div>{a.role}</div>
            </div>
        )
    })
    let menuTitle = props.sidebar.menuTitle.map((m) => {
        return (
            <div key={m.id} className={`${styles.link}`}>
                <NavLink to={m.url}
                         className={navData => navData.isActive ? styles.active : styles.link}>
                    {m.title}
                </NavLink>
            </div>
        )
    })
    let companyEmployees = props.sidebar.companyEmployees.map((em) => {
        return (
            <div key={em.id} className={`${styles.link}`}>
                <div>
                    <div>
                        <img src={em.photo} width="50px" alt=""/>
                    </div>
                    <span>{em.name} - </span>
                    <span>{em.position}</span>
                </div>
            </div>
        )
    })
    //

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <h4>{props.sidebar.title}</h4>
                {admin}
                {menuTitle}
                {companyEmployees}
            </div>
        </div>
    );
}

// <div class Name={styles.items}>
//     <div className={`${styles.link}`}><NavLink to="/profile" className={ navData => navData.isActive ? styles.active : styles.link} >Profile</NavLink></div>
//     <div className={`${styles.link} ${styles.active}`}><NavLink to="/dialogs" className={ navData => navData.isActive ? styles.active : styles.link}>Message</NavLink></div>
//     <div className={`${styles.link} ${styles.active}`}><NavLink to="/news" className={ navData => navData.isActive ? styles.active : styles.link}>News</NavLink></div>
//     <div className={`${styles.link} ${styles.active}`}><NavLink to="/music" className={ navData => navData.isActive ? styles.active : styles.link}>Music</NavLink></div>
//     <div className={`${styles.item} ${styles.active}`}><NavLink to="/sittings" className={ navData => navData.isActive ? styles.active : styles.item}>Sittings</NavLink></div>
// </div>