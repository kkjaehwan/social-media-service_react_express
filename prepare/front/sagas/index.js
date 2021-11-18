import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';
import contactSaga from './contact';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  // all         : 동시 실행
  // fork        : 비동기 함수 호출
  // call        : 동기 함수 호출
  // put         : dispatch to the store
  // delay       : 타이머
  // debounce    : 연이어 함수가 호출 될때 마지막 입력후 몇초 동안 입력이 없는 경우 함수 호출(dos 공격을 막기 위한 행위)
  // throttle    : 특정 시간 안에 한번만 요청을 보내도록 함(dos 공격을 막기 위한 행위)
  // take        : 액션이 실행 되면 동기적 함수 실행. 단, 한번만 실행(두번째 요청부터 수행 안함), 그래서 while문으로 감쌈
  // takeEvery   : 액션이 실행 되면 비동기적 함수 실행.
  // takeLatest  : 비동기적 수행. 여러번 입력이 들어 올 경우 동시 모든 요청은 서버에 보내지만 마지막만 응답만 수행함
  // takeLeading : 비동기적 수행. 여러번 입력이 들어 올 경우 동시 모든 요청은 서버에 보내지만 첫번째만 응답만 수행함
  // takeMaybe   :
  yield all([
    fork(postSaga),
    fork(userSaga),
    fork(contactSaga),
  ]);
}
