import { useContext } from 'react';
import { StateContext } from './StateContext';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const saveCurrentState = (context, event) => {
  const stateContext = useContext(StateContext);
  stateContext.setCurrentState(event.value);
}


export const gotoHome = (context, event) => {
  const history = useHistory();
  history.replace('/signup');
};

export const signup = (context, event) => {
  const history = useHistory();
  useEffect(() => {
    if (event.type === 'LOGIN' && event.authenticated) {
      history.push('/home');
    }
  }, [event]);
};


export const verifyCredentials = (context, event) => {
  return true;
  
};

