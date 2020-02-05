const initialState = {
  username: '',
  profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case UPDATE_USER:
      return {...state, username: payload.username, profile_pic: payload.profile_pic }

    default:
      return state;
  }
}

export function updateUser(user) {
  console.log('Updating User with data:');
  console.log(user);
  return {
    type: UPDATE_USER,
    payload: user
  }
}