import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

const navigationMachine = createMachine({
  id: 'navigation',
  initial: 'splash',
  states: {
    splash: {
      on: {
        SIGNUP: {
          target: 'signup',
          actions: assign((context, event) => {
            // history.replace('/signup')
          })
        },
        AUTOLOGIN: {
          target: 'home',
          actions: assign((context, event) => {
            // history.replace('/home')
          })
        }
      },
      // before: (context, event) => {
      //   return new Promise(resolve => {
      //     setTimeout(() => {
      //       // Verifica si hay una sesión iniciada
      //       const isLoggedIn = localStorage.getItem('isLoggedIn');
      //       resolve({ type: isLoggedIn ? 'HOME' : 'LOGIN' });
      //     }, 2000);
      //   });
      // }
    },
    signup: {
      on: {
        LOGIN: {
          target: 'home',
          actions: assign((context, event) => {
            // history.push('/home')
          })
        }
      }
    },

    home: {
      on: {
        PROFILE: {
          target: 'profile',
          actions: assign((context, event) => {
            // history.push('/profile')
          })
        },
        // PRODUCTS: {
        //   target: 'productos',
        //   actions: assign((context, event) => {
        //     // history.push('/products')
        //   })
        // },
        LOGOUT: {
          target: 'signup',
          actions: assign((context, event) => {
            // history.push('/signup')
          })
        }
      }
    },
    profile: {
      on: {
        PROFILE_FINISHED: {
          target: 'home',
          actions: assign((context, event) => {
            // history.goBack()
          })
        }
      }
    },
    // productos: {
    //   on: {
    //     PRODUCTS_FINISHED: {
    //       target: 'home',
    //       actions: assign((context, event) => {
    //         // history.goBack()
    //       })
    //     }
    //   }
    // }
  },
});

export const useNavigationMachine = () => {
  const [current, send ] =useMachine(navigationMachine);
  return [current, send ]
}
