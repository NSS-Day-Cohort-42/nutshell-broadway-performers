const eventHub = document.querySelector(".container");

const dispatchStateChangeEvent = () => {
  const friendsStateChangedEvent = new CustomEvent("friendsStateChanged");
  eventHub.dispatchEvent(friendsStateChangedEvent);
};

let friends = [];

export const useFriends = () => {
  return friends.slice();
};

export const getFriends = () => {
  return fetch("http://localhost:8088/friends?_expand=user")
    .then((response) => response.json())
    .then((friendsData) => {
      friends = friendsData;
    });
};

export const saveFriend = (newFriendObj) => {
  const jsonFriend = JSON.stringify(newFriendObj);

  return fetch("http://localhost:8088/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonFriend,
  })
    .then(getFriends)
    .then(dispatchStateChangeEvent);
};

export const deleteFriend = (friendObjId) => {
  return fetch(`http://localhost:8088/friends/${friendObjId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(getFriends)
    .then(dispatchStateChangeEvent);
};
