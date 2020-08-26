const eventHub = document.querySelector(".container");
const dispatchStateChangeEvent = () => {
  const usersStateChangedEvent = new CustomEvent("usersStateChanged");
  eventHub.dispatchEvent(usersStateChangedEvent);
};

let users = [];

export const useUsers = () => {
  return users.slice();
};

export const getUsers = () => {
  return fetch("http://localhost:8000/users")
    .then((response) => response.json())
    .then((usersData) => {
      users = usersData;
    });
};

export const saveUser = (newUserObj) => {
  const jsonUser = JSON.stringify(newUserObj);

  return fetch("http://localhost:3003/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonUser,
  })
    .then(getUsers)
    .then(dispatchStateChangeEvent);
};
