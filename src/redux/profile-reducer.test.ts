import {
    actions,
    postID1,
    postID2, postID3, postID4, postID5, PostsType,
    profileReducer, ProfileType
} from './profile-reducer';



const state = {
    posts: [
        {id: postID1, message: 'Hi, how are you?', likesCount: 12},
        {id: postID2, message: 'It\'s my first post', likesCount: 5},
        {id: postID3, message: 'I will succeed!', likesCount: 21},
        {id: postID4, message: 'I\'m Victor', likesCount: 13},

    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    idPageCurrent: 1,
    status: '',
}

test('new post should be added', () => {
    const action = actions.addPostAC('victor vagner')

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
});

test('message, likes - post should be correct', () => {
    const action = actions.addPostAC('victor vagner')

    const newState = profileReducer(state, action)

    expect(newState.posts[0].message).toBe('victor vagner')
    expect(newState.posts[0].likesCount).toBe(0)
});

test('delete post', () => {
    const action = actions.deletePostAC(postID1)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
});

test('post should 4 ', () => {
    const action = actions.deletePostAC(postID5)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
});


