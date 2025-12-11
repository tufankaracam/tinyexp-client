export const sessionList = {};

export const getUserDataBySession = (sessionId) => {
  return sessionList?.[sessionId];
};

export const setUserDataBySession = (sessionId, userData) => {
  sessionList[sessionId] = {...sessionList[sessionId],...userData};
};

export const deleteUserDataBySession = (sessionId, userData) => {
  delete sessionList[sessionId];
};

export const setPasswordResetCode= (sessionId, code) => {
  sessionList[sessionId] = {...sessionList[sessionId],...code};
};

export const deleteResetCode = (sessionId)=>{
  const {code,...rest} = sessionList[sessionId];
  sessionList[sessionId] = rest;
}