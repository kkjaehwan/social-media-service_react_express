import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux'; // redux(함수들)를 합치는 유닛

import user from './user';
import post from './post';
import contact from './contact';

// (이전상태, 액션) => 다음상태
// const rootReducer = combineReducers({
//   index: (state = {}, action) => { // SSR(Server Side Rendering)을 위한 HYDRATE를 사용
//     switch (action.type) {
//       case HYDRATE:
//         console.log('HYDRATE', action);
//         return { ...state, ...action.payload };
//       default:
//         return state;
//     }
//   },
//   user,
//   post,
//   contact,
// });
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        contact,
      });
      return combinedReducer(state, action);
    }
  }
};
export default rootReducer;
