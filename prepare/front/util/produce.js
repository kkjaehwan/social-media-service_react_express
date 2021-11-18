import { enableES5, produce } from 'immer';

// immer IE 11제공하기 위한 처리

const immersurpport = (...args) => {
  enableES5();
  return produce(...args);
};
export default immersurpport;

// export default (...args) => {
//   enableES5();
//   return produce(...args);
// };
