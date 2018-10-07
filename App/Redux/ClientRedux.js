import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { findClientByPhoneNumber, findAndReplaceClient, removeClientByPhoneNumber } from '../Utils/ClientUtils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addNewClient: ['newClient'],
  updateClient: ['clientPhoneNumber', 'updatedClient'],
  removeClient: ['clientPhoneNumber'],
  selectClient: ['selectedClient'],
  clearAll: null
})

export const ClientTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  clients: [],
  selectedClient: null
})

/* ------------- Reducers ------------- */

export const addNewClient = (state, { newClient }) => {
  const currentData = [...state.clients];
  const isDuplicate = findClientByPhoneNumber(currentData, newClient.phoneNumber) !== undefined;
  const newData = isDuplicate ? findAndReplaceClient(currentData, newClient.phoneNumber, newClient) : [...currentData, newClient];
  return state.merge({ clients: newData });
}

export const updateClient = (state, { clientPhoneNumber, updatedClient }) => {
  const currentData = [...state.clients];
  const dataAfterRemoved = removeClientByPhoneNumber(currentData, clientPhoneNumber);
  const isDuplicate = findClientByPhoneNumber(dataAfterRemoved, updatedClient.phoneNumber) !== undefined;
  const newData = isDuplicate ? findAndReplaceClient(dataAfterRemoved, updatedClient.phoneNumber, updatedClient) : [...dataAfterRemoved, updatedClient];
  return state.merge({ clients: newData });
}

export const removeClient = (state, { clientPhoneNumber }) => {
  const currentData = [...state.clients];
  const newData = removeClientByPhoneNumber(currentData, clientPhoneNumber);
  return state.merge({ clients: newData });
}

export const selectClient = (state, { selectedClient }) =>
  state.merge({ selectedClient })

export const clearAll = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_NEW_CLIENT]: addNewClient,
  [Types.UPDATE_CLIENT]: updateClient,
  [Types.REMOVE_CLIENT]: removeClient,
  [Types.SELECT_CLIENT]: selectClient,
  [Types.CLEAR_ALL]: clearAll
})
