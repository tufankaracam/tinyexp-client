export const sessionList = {};

export const getUserDataBySession = (sessionId) => {
  return sessionList?.[sessionId];
};

export const setUserDataBySession = (sessionId, userData) => {
  sessionList[sessionId] = userData;
};

export const deleteUserDataBySession = (sessionId, userData) => {
  delete sessionList[sessionId];
};
