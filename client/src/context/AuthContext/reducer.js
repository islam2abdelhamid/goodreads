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
      case actions.REGISTER:
        localStorage.setItem('goodReadsToken', action.payload.token);
        resolve({ user: action.payload, isLogged: true, isLoaded: true });
        break;
      case actions.CHECK_AUTH:
        const token = localStorage.getItem('goodReadsToken');
        if (!token) {
          resolve({ user: null, isLogged: false, isLoaded: true });
          break;
        }
        axios
          .get('/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            resolve({ user: result.data, isLogged: true, isLoaded: true });
          })
          .catch((err) => {
            console.log(err);
            // localStorage.removeItem('goodReadsToken');
            resolve({ user: null, isLogged: false, isLoaded: true });
          });
        break;
      case actions.LOGOUT:
        localStorage.removeItem('goodReadsToken');
        resolve({ user: null, isLogged: false, isLoaded: true });
        break;
      default:
        return state;
    }
  });
};

export default reducer;
