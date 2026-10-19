const BASE_URL = "http://localhost:3001";

const request = (endpoint, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Erro na requisição.");
      });
    }

    return res.json();
  });
};

export const registerUser = (data) => {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = (data) => {
  return request("/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCurrentUser = (token) => {
  return request("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDreams = (token) => {
  return request("/dreams", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDream = (data, token) => {
  return request("/dreams", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteDream = (dreamId, token) => {
  return request(`/dreams/${dreamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
