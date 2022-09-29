import React from 'react';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';

export function News() {
    return (
        <div>
            <h1>News</h1>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, amet consequuntur cumque doloremque dolorum eligendi eos fugiat ipsam iste iure iusto magnam nihil possimus qui rerum vitae voluptas! Inventore, numquam?</p>

        </div>
    );
};

export let WithNewsRedirect = WithAuthRedirect(News)