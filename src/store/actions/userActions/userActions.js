import { axiosWithAuth } from '../../../utils/axiosWithAuth';

export const ADD_USER = 'add-user';

export const signin = (data, history) => {
  return (dispatch) => {
    axiosWithAuth()
      .post('/auth/login', data)
      .then((res) => {
        window.localStorage.clear();
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('id', res.data.user.id);
        dispatch({ type: ADD_USER, payload: { data, id: res.data.user.id } });

        history.push('/dashboard');
      })
      .catch((err) => {
        console.log('login error: ', err);
      });
  };
};

export const signup = (data, history) => {
  return () => {
    axiosWithAuth()
      .post('/auth/register', data)
      .then(() => {
        history.push('/login');
      })
      .catch((err) => {
        console.log('Signup error: ', err);
      });
  };
};
