import React, {ComponentType, PropsWithChildren} from 'react';
import {useParams} from 'react-router-dom';

type ProfileFCReturned<T> = {
    (props: PropsWithChildren<T>): JSX.Element
}

export const ProfileFC = <T extends unknown>(Component: ComponentType<T>): ProfileFCReturned<T> => {
    const ReturnedComponent = (props: PropsWithChildren<T>) => {
        let params = useParams<'id'>()
        return <Component {...props} id={params.id}/>
    }
    return ReturnedComponent
};

const Div = (props: {name: number}) => {
    return (
        <div></div>
    )
}

const WrappedDiv = ProfileFC(Div)

const Component = () => {
    return <WrappedDiv name={3}/>
}