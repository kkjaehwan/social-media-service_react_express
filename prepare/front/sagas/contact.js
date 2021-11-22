import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
  ADD_CONTACT_FAILURE,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  LOAD_CONTACTS_FAILURE,
  LOAD_CONTACTS_REQUEST,
  LOAD_CONTACTS_SUCCESS,
  REMOVE_CONTACT_FAILURE,
  REMOVE_CONTACT_REQUEST,
  REMOVE_CONTACT_SUCCESS,
} from '../reducers/contact';

function loadContactsAPI() {
  return axios.get('/contacts');
}

function* loadContacts() {
  try {
    const result = yield call(loadContactsAPI);
    yield put({
      type: LOAD_CONTACTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CONTACTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addContactAPI(data) {
  return axios.post('/contact', data);
}

function* addContact(action) {
  try {
    const result = yield call(addContactAPI, action.data);
    yield put({
      type: ADD_CONTACT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_CONTACT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeContactAPI(data) {
  const params = {
    params: data,
  };
  return axios.delete('/contact', params);
}

function* removeContact(action) {
  try {
    const result = yield call(removeContactAPI, action.data);
    // yield delay(1000);
    yield put({
      type: REMOVE_CONTACT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_CONTACT_FAILURE,
      error: err.response.data.message,
      id: err.response.data.id,
    });
  }
}

function* watchLoadContacts() {
  yield takeLatest(LOAD_CONTACTS_REQUEST, loadContacts);
}

function* watchAddContact() {
  yield takeLatest(ADD_CONTACT_REQUEST, addContact);
}

function* watchRemoveContact() {
  yield takeLatest(REMOVE_CONTACT_REQUEST, removeContact);
}

export default function* contactSaga() {
  yield all([
    fork(watchAddContact),
    fork(watchLoadContacts),
    fork(watchRemoveContact),
  ]);
}
