import React, {Suspense} from 'react';

import {Avatar, Breadcrumb, Col, Layout, Menu, Row} from 'antd';
import type { MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';


import styles from './App.module.css';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';
import {Error} from './component/Error/Error';
import {UsersPage} from './component/Users/UsersPage';
import {HeaderMain} from './component/Header/HeaderMain';
import {LoginPage} from './component/Login/LoginPage';
import {WithNewsRedirect} from './component/News/News';
import {connect} from 'react-redux';
import {compose} from 'redux';
import store, {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/app-reducer';
import {Preloader} from './component/common/Preloader/Preloader';
import {withSuspense} from './HOC/WithSuspense';
import 'antd/dist/antd.css'
import {Button} from 'antd';
import {SidebarType, store1} from './redux/store';
import {v1} from 'uuid';
import {Footer} from 'antd/es/layout/layout';

const DialogsContainer = React.lazy(() => import('./component/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)



const {Content, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//     key,
//     label: `nav ${key}`,
// }));


const menu = [
    {id: v1(), url: '/profile', title: 'Social', status: true},
    {id: v1(), url: '/dialogs', title: 'Personal account', status: true},
    {id: v1(), url: '/news', title: 'Profile', status: true},
    {id: v1(), url: '/doctors', title: 'Doctors', status: true},
    {id: v1(), url: '/patients', title: 'Patients', status: true},
    {id: v1(), url: '/services', title: 'Services', status: true},
    {id: v1(), url: '/users', title: 'Settings', status: true},
]

const items2: any = menu.map((el, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            // icon: React.createElement(icon),
            label: `${el.title}`,

            children: store.getState().sidebar.menuTitle.map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: <div key={subKey}> <Link key={subKey} to={_.url} > {_.title}</Link></div> ,
                };
            }),
        };

    },
);

// <div key={m.id} className={`${styles.link}`}>
//     <Link to={m.url}
//         //    className={navData => navData.isActive ? styles.active : styles.link}
//     >
//         {m.title}
//     </Link>
// </div>

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//     (icon, index) => {
//         const key = String(index + 1);
//
//         return {
//             key: `sub${key}`,
//             icon: React.createElement(icon),
//             label: `subnav ${key}`,
//
//             children: new Array(4).fill(null).map((_, j) => {
//                 const subKey = index * 4 + j + 1;
//                 return {
//                     key: subKey,
//                     label: `option${subKey}`,
//                 };
//             }),
//         };
//     },
// );


class App extends React.Component<AppPropsType> {
    // перехват ошибки
    //reason: any, promise: any
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        // Ниже сделан side Effect. Мы оставили мусор за собой.
        // после того как компонента будет умирать этот мусор нужно убрать
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    // Это   который срабатывает при демонтировании компоненты
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    // если вдруг наше приложение не проинициализировалось, то мы показываем Preloader
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        // let sidebar = store.getState().sidebar
        return (
            <div>
                <Layout>
                    <HeaderMain/>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu mode="inline"
                                defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                                items={items2}/>
                            {/*<Sidebar sidebar={sidebar}/>*/}
                        </Sider>

                        <Layout style={{padding: '0 24px 24px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}>
                                <div className="App">
                                    <div className={styles.items}>
                                        <Routes>
                                            <Route path="/profile" element={
                                                <Suspense fallback={<Preloader/>}>
                                                    <SuspendedProfile/>
                                                </Suspense>
                                            }/>
                                            <Route path="/profile/:id" element={
                                                <Suspense fallback={<Preloader/>}>
                                                    <SuspendedProfile/>
                                                </Suspense>
                                            }/>

                                            <Route path="/dialogs/*" element={
                                                <Suspense fallback={<Preloader/>}>
                                                    <SuspendedDialogs/>
                                                </Suspense>
                                            }/>
                                            {/*<Route path="/dialogs/*" element={<DialogsContainer/>}/>*/}
                                            <Route path="/users" element={<UsersPage/>}/>
                                            <Route path="/news" element={<WithNewsRedirect/>}/>
                                            <Route path="/music" element={<Music/>}/>
                                            <Route path="/sittings" element={<Sittings/>}/>
                                            <Route path="/login" element={<LoginPage/>}/>

                                            <Route path="*" element={<Error/>}/>

                                            <Route path="/" element={<Navigate to="/profile"/>}/>
                                        </Routes>
                                    </div>
                                </div>
                            </Content>
                            <Footer style={{textAlign: 'center'}}>End Social Network 2022</Footer>
                        </Layout>
                    </Layout>
                </Layout>

            </div>
        );
    }
}

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})


export type AppPropsType = MapStatePropsType & MapDispatchPropsType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

