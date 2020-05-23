import * as actions from './actionTypes';
import axiosLogged from '../../axios/logged';

const reducer = (state, action) => {
  return new Promise(resolve => {
    switch (action.type) {
      case actions.LOGIN:
      case actions.REGISTER:
        localStorage.setItem('goodReadsToken', action.payload.token);
        
        resolve({ user: action.payload.user, isLogged: true, isLoaded: true });
        break;
      case actions.CHECK_AUTH:
        const token = localStorage.getItem('goodReadsToken');
        if (!token) {
          resolve({ user: null, isLogged: false, isLoaded: true });
          break;
        }
        axiosLogged
          .get('/users/profile')
          .then(result => {
            resolve({ user: result.data, isLogged: true, isLoaded: true });
          })
          .catch(err => {
            console.log(err);
            resolve({ user: null, isLogged: false, isLoaded: true });
          });
        break;
      case actions.LOGOUT:
        axiosLogged
          .post('/users/logout')
          .then(result => {
            resolve({ user: null, isLogged: false, isLoaded: true });
            localStorage.removeItem('goodReadsToken');
          })
          .catch(err => {
            console.log(err);
          });

        break;
      default:
        return state;
    }
  });
};

export default reducer;
