import React from 'react';
import {useSelector} from 'react-redux';
import {logout} from '../../redux/auth-reducer';
import {AppStateType, useAppDispatch} from '../../redux/redux-store';
import styles from './Header.module.css';
import {Link, NavLink} from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, MenuProps, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import logoMatryoshka from '../image/icon-matryoshka.png'
import {selectIsAuth, selectLogin} from '../../redux/auth-selectors';

const {Header, Content, Sider} = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `not Active${key}`,
}));

export const HeaderMain = () => {

    const isAuth = useSelector( selectIsAuth)
    const login = useSelector(selectLogin)

    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Row>
                        <Col span={8}>
                            <div className={styles.block}>
                                <div className={styles.image}>
                                    <Link to={'./profile'}><img src={logoMatryoshka} alt=""/></Link>
                                </div>
                                    { isAuth ? <Menu disabled style={{height: '100%', borderRight: 0}} theme="dark" mode="horizontal"
                                                      defaultSelectedKeys={['2']} items={items1}/> : <div>. . .</div>}
                            </div>
                        </Col>
                        <Col span={8} >
                            <div className={styles.center}>
                                <p>Social network project.</p>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.loginBlock}>
                                { isAuth && <Link to={'./profile'}><Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/></Link>}
                                {login}
                                {isAuth
                                    ? <div><Button type={'link'} onClick={logoutHandler}>Log out</Button></div>
                                    : <NavLink to={'./login'}>Login</NavLink>
                                }
                            </div>
                        </Col>
                    </Row>


                </div>
            </div>
        </Header>
    );
}


// Старый код
// class HeaderContainer extends React.Component<PropsType> {
//
//     render() {
//         return (
//             <div>
//                 <Header {...this.props}/>
//             </div>
//
//         );
//     }
// }
//
// const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
//     isAuth: state.auth.isAuth,
//     login: state.auth.login,
// })
//
// export default connect<MapStatePropsType, MapDispatchPropsType, {},  AppStateType>(mapStateToProps, {logout})(HeaderContainer)
//
//
// type MapStatePropsType = {
//     isAuth: boolean
//     login: string | null
// }
// type MapDispatchPropsType = {
//     logout: () => void
// }
//
