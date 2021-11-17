import { enableES5, produce } from 'immer';

// immer IE 11제공하기 위한 처리
export default (...args) => {
  enableES5();
  return produce(...args);
};
