import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

const navigationMachine = createMachine({
  id: 'navigation',
  predictableActionArguments:true,
  initial: 'splash',
  states: {
    splash: {
      on: {
        LOGIN: 'login',
        HOME: 'home'
      }
    },
    login: {
      on: {
        HOME: 'home'
      }
    },
    home: {
      on: {
        LOGOUT: 'login',
        PROFILE: 'profile',
        PRODUCTS: 'products'
      }
    },
    profile: {
      on: {
        HOME: 'home'
      }
    },
    products: {
      on: {
        HOME: 'home'
      }
    }
  }
});

export const useNavigationMachine = () => useMachine(navigationMachine);
