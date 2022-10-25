import React, {useEffect} from 'react';
import styles from './Users.module.css'
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import {FilterType, follow, requestUsers, unFollow} from '../../redux/users-reducer';
import {UsersSearchForm} from './UsersSearchForm';
import {useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors';
import {useAppDispatch} from '../../redux/redux-store';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';


type PropsType = {}

export const Users: React.FC<PropsType> = React.memo((props) => {

    // useEffect(() => {
    //     dispatch(requestUsers(currentPage, pageSize, filter))
    // }, [])


    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useAppDispatch()


    const useNavigateSearch = () => {
        const navigate = useNavigate();
        return (pathname: any, params: any) =>
            navigate(`${pathname}?${createSearchParams(params)}`);
    };

    const navigateSearch = useNavigateSearch();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        let actualPage = currentPage;
        let actualFilter = filter;

        const queryFriend = query.get('friend');
        const queryPage = query.get('page');
        const queryTerm = query.get('term');

        if (queryPage) actualPage = +queryPage;

        if (queryTerm) actualFilter = {...actualFilter, term: queryTerm};

        switch (queryFriend) {
            case 'null':
                actualFilter = {...actualFilter, friend: '' as unknown as boolean | null};
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true};
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false};
                break;
            default:
                break;
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, []);
//location.search

    useEffect(() => {
        navigateSearch('/users', {
            term: `${filter.term}`,
            count: `${pageSize}`,
            friend: `${filter.friend}`,
            page: `${currentPage}`,
        });

    }, [filter, currentPage, pageSize]);



    const onClickCurrentPage = (currentPage: number) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followCB = (userID: string) => {
        dispatch(follow(userID))
    }
    const unFollowCB = (userID: string) => {
        dispatch(unFollow(userID));
    }

    return (
        <div className={styles.container}>
            users will be here
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <hr/>
            <div>
                <Paginator
                    currentPage={currentPage}
                    onClickCurrentPage={onClickCurrentPage}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
            <hr/>
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    follow={followCB}
                    unFollow={unFollowCB}
                />
            )}
        </div>
    );
})


// Masha Draguta
// import {
//     createSearchParams,
//     useLocation,
//     useNavigate,
// } from "react-router-dom";
//
// const useNavigateSearch = () => {
//     const navigate = useNavigate();
//     return (pathname, params) =>
//         navigate(`${pathname}?${createSearchParams(params)}`);
// };
//
// const navigateSearch = useNavigateSearch();
// const location = useLocation();
// useEffect(() => {
//
//     navigateSearch("/users", {
//         page: `${currentPage}`,
//         count: `${pageSize}`,
//         term: `${filter.term}`,
//         friend: `${filter.friend}`,
//     });
//
// }, [filter, currentPage, pageSize]);
//
// useEffect(() => {
//     const query = new URLSearchParams(location.search);
//
//     let actualPage = currentPage;
//     let actualFilter = filter;
//
//     const queryFriend = query.get("friend");
//     const queryPage = query.get("page");
//     const queryTerm = query.get("term");
//
//     if (queryPage) actualPage = +queryPage;
//
//
//     if (queryTerm)
//         actualFilter = { ...actualFilter, term: queryTerm };
//
//     switch (queryFriend) {
//         case "null":
//
//             actualFilter = { ...actualFilter, friend: "" };
//
//             break;
//         case "true":
//
//             actualFilter = { ...actualFilter, friend: true };
//             break;
//         case "false":
//
//             actualFilter = { ...actualFilter, friend: false };
//             break;
//         default:
//             break;
//     }
//     dispatch(getUserThunkCreator(actualPage, pageSize, actualFilter));
// }, [location.search]);
