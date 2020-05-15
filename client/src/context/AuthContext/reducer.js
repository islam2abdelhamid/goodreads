import * as actions from './actionTypes';
import axios from '../../axios';
// const reducer = (state, action) => {
//   switch (action.type) {
//     case actions.LOGIN:
//       localStorage.setItem(
//         'goodReadsToken',
//         JSON.stringify(action.payload.token)
//       );
//       return action.payload;

//     case actions.LOGOUT:
//       return {
//         user: null,
//         isLogged: false,
//         isAdmin: false,
//       };

//     default:
//       return state;
//   }
// };

const reducer = (state, action) => {
  return new Promise((resolve) => {
    switch (action.type) {
      case actions.LOGIN:
        localStorage.setItem(
          'goodReadsToken',
          JSON.stringify(action.payload.token)
        );
        return resolve(action.payload);

      case actions.CHECK_AUTH:
        console.log('check auth');
        const token = localStorage.getItem('goodReadsToken');
        if (!token) {
          return state;
        }
        axios
          .get('/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            resolve(result);
          });
        return;
      case actions.LOGOUT:
        return resolve({});

      default:
        return resolve(state);
    }
  });
};

export default reducer;
