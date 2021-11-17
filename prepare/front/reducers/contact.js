import produce from '../util/produce';

export const initialState = {
  mainContacts: [
    // {
    //   id: '1',
    //   key: '1',
    //   email: 'Joe@gmail.com',
    //   nickname: 'Joe',
    //   content: 'I want to hire you',
    // },
    // {
    //   id: '2',
    //   key: '2',
    //   email: 'patrick@gmail.com',
    //   nickname: 'Patrick',
    //   content: 'There are opurtunities for you',
    // },
    // {
    //   id: '3',
    //   key: '3',
    //   email: 'jay@gmail.com',
    //   nickname: 'Jay',
    //   content: 'I am looking forward to your response',
    // },
  ],
  hasMoreContacts: true,
  loadContactsLoading: false,
  loadContactsDone: false,
  loadContactsError: null,
  addContactLoading: false,
  addContactDone: false,
  addContactError: null,
  removeContactLoading: false,
  removeContactDone: false,
  removeContactError: null,
};

export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE';

export const REMOVE_CONTACT_SUCCESS = 'REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_REQUEST = 'REMOVE_CONTACT_REQUEST';
export const REMOVE_CONTACT_FAILURE = 'REMOVE_CONTACT_FAILURE';

export const LOAD_CONTACTS_FAILURE = 'LOAD_CONTACTS_FAILURE';
export const LOAD_CONTACTS_REQUEST = 'LOAD_CONTACTS_REQUEST';
export const LOAD_CONTACTS_SUCCESS = 'LOAD_CONTACTS_SUCCESS';

export const addContact = (data) => ({
  type: ADD_CONTACT_REQUEST,
  data,
});

// const dummyContact = {
//   id: 3,
//   content: 'test22',
//   email: 'test@test.com',
// };

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_CONTACT_REQUEST:
      draft.addContactLoading = true;
      draft.addContactDone = false;
      draft.addContactError = null;
      break;
    case ADD_CONTACT_SUCCESS:
      draft.addContactLoading = false;
      draft.addContactDone = true;
      draft.mainContacts.unshift(action.data);
      break;
    case ADD_CONTACT_FAILURE:
      draft.addContactLoading = false;
      draft.addContactError = action.error;
      break;
    case REMOVE_CONTACT_REQUEST:
      draft.removeContactLoading = true;
      draft.removeContactDone = false;
      draft.removeContactError = null;
      break;
    case REMOVE_CONTACT_SUCCESS:
      draft.removeContactLoading = false;
      draft.removeContactDone = true;
      draft.mainContacts = draft.mainContacts.filter((v) => v.id !== action.data.ContactId);
      break;
    case REMOVE_CONTACT_FAILURE:
      draft.removeContactLoading = false;
      draft.removeContactError = action.error;
      break;
    case LOAD_CONTACTS_REQUEST:
      draft.loadContactsLoading = true;
      draft.loadContactsDone = false;
      draft.loadContactsError = null;
      break;
    case LOAD_CONTACTS_SUCCESS:
      draft.loadContactsLoading = false;
      draft.loadContactsDone = true;
      draft.mainContacts = draft.mainContacts.filter((v) => v.id !== action.data);
      draft.mainContacts = action.data;
      break;
    case LOAD_CONTACTS_FAILURE:
      draft.loadContactsLoading = false;
      draft.loadContactsError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
