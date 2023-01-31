import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationMachine } from '../machines/machine';

export default function NavigatorMachine() {
  const [current, send] = useNavigationMachine()
  const history = useNavigate();

  useEffect(() => {
   
    switch (current.value) {
      case 'splash':
        history('/');
        break;
      case 'signup':
        history('/signup');
        break;
      case 'home':
        // history('/home');
        break;
      case 'profile':
        // history('/profile');
        break;
      default:
        break;
    }
  }, []);

  return null;
}