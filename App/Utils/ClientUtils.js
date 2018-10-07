export const findClientByPhoneNumber = (clientList = [], phoneNumber) => {
  const list = clientList ? clientList : [];
  const found = list.find(client => client.phoneNumber === phoneNumber);
  return found;
}

export const findAndReplaceClient = (clientList = [], phoneNumber, newData) => {
  const list = clientList ? clientList : [];
  const foundIndex = list.findIndex(client => client.phoneNumber === phoneNumber);
  if (foundIndex < list.length) list[foundIndex] = newData;
  return clientList;
}

export const removeClientByPhoneNumber = (clientList = [], phoneNumber) => {
  const list = clientList ? clientList : [];
  const newList = list.filter(client => client.phoneNumber !== phoneNumber);
  return newList;
}
