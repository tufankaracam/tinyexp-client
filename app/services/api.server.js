const url = `http://localhost:5000/api/v1`;

export const request = async ({
  route,
  method = "GET",
  token = null,
  body = null,
}) => {
  const headers = new Headers();

  headers.append("Content-Type", "Application/Json");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${url}${route}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    credentials: "include",
    headers,
  });

  const data = response.json();

  return data;
};

export const login = async ({ email, password }) => {
  return await request({
    route: "/auth/login",
    method: "post",
    token: null,
    body: {
      email,
      password,
    },
  });
};

export const register = async ({ email, username, password, password2 }) => {
  return await request({
    route: "/auth/register",
    method: "post",
    token: null,
    body: { email, username, password, password2 },
  });
};

export const getCategories = async (token) => {
  return await request({
    route: `/categories`,
    token,
  });
};

export const getCharacter = async (token) => {
  return await request({
    route: `/categories/character`,
    token,
  });
};

export const createCategories = async ({ token, name }) => {
  return await request({
    route: `/categories`,
    method: "post",
    body: { name },
    token,
  });
};

export const updateCategories = async ({ token, name, id }) => {
  return await request({
    route: `/categories/${id}`,
    method: "put",
    body: { name },
    token,
  });
};

export const deleteCategories = async ({ token, id }) => {
  return await request({
    route: `/categories/${id}`,
    method: "delete",
    token,
  });
};

export const getSubCategoriesById = async (token, categoryId) => {
  return await request({
    route: `/categories/${categoryId}`,
    token,
  });
};

export const createSubCategories = async ({ token, name, categoryid }) => {
  return await request({
    route: `/subcategories`,
    method: "post",
    body: { name, categoryid },
    token,
  });
};

export const updateSubCategories = async ({ token, name, categoryid, id }) => {
  return await request({
    route: `/subcategories/${id}`,
    method: "put",
    body: { name, categoryid },
    token,
  });
};

export const deleteSubCategories = async ({ token, id }) => {
  return await request({
    route: `/subcategories/${id}`,
    method: "delete",
    token,
  });
};

export const getTrackingTypes = async (token) => {
  return await request({
    route: `/trackingtypes`,
    token,
  });
};

export const createTrackingTypes = async ({ token, name }) => {
  return await request({
    route: `/trackingtypes`,
    method: "post",
    body: { name },
    token,
  });
};

export const updateTrackingTypes = async ({ token, name, id }) => {
  return await request({
    route: `/trackingtypes/${id}`,
    method: "put",
    body: { name },
    token,
  });
};

export const deleteTrackingTypes = async ({ token, id }) => {
  return await request({
    route: `/trackingtypes/${id}`,
    method: "delete",
    token,
  });
};

export const getActivitiesById = async (token, subcategoryid) => {
  return await request({
    route: `/subcategories/${subcategoryid}/activities`,
    token,
  });
};

export const createActivities = async ({ token, name, subcategoryid,trackingtypeid,minvalue }) => {
  return await request({
    route: `/activities`,
    method: "post",
    body: { name, subcategoryid,trackingtypeid,minvalue },
    token,
  });
};

export const updateActivities = async ({ token, name, subcategoryid,trackingtypeid,minvalue, id }) => {
  return await request({
    route: `/activities/${id}`,
    method: "put",
    body: { name, subcategoryid,trackingtypeid,minvalue },
    token,
  });
};

export const deleteActivities = async ({ token, id }) => {
  return await request({
    route: `/activities/${id}`,
    method: "delete",
    token,
  });
};

export const getActivityLogsById = async (token, activityid) => {
  return await request({
    route: `/activities/${activityid}/activitylogs`,
    token,
  });
};

export const createActivityLogs = async ({ token, activityid,activityvalue,activitydatetime,activitynote }) => {
  return await request({
    route: `/activitylogs`,
    method: "post",
    body: { activityid,activityvalue,activitydatetime,activitynote  },
    token,
  });
};

export const updateActivityLogs = async ({ token, activityvalue,activitydatetime,activitynote, id }) => {
  return await request({
    route: `/activitylogs/${id}`,
    method: "put",
    body: { activityvalue,activitydatetime,activitynote },
    token,
  });
};

export const deleteActivityLogs = async ({ token, id }) => {
  return await request({
    route: `/activitylogs/${id}`,
    method: "delete",
    token,
  });
};
