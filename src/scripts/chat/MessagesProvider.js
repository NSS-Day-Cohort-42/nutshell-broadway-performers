const eventHub = document.querySelector(".container");

const dispatchStateChangeEvent = () => {
  const messagesStateChangedEvent = new CustomEvent("messagesStateChanged");
  eventHub.dispatchEvent(messagesStateChangedEvent);
};

let messages = [];

export const useMessages = () => {
  return messages.slice();
};

export const getMessages = () => {
  return fetch("http://localhost:8088/messages")
    .then((response) => response.json())
    .then((messagesData) => {
      messages = messagesData;
    });
};

export const saveMessage = (newMessageObj) => {
  const jsonMessage = JSON.stringify(newMessageObj);

  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonMessage,
  })
    .then(getMessages)
    .then(dispatchStateChangeEvent);
};

export const deleteMessage = (messageObjId) => {
  return fetch(`http://localhost:8088/messages/${messageObjId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(getMessages)
    .then(dispatchStateChangeEvent);
};
