const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addFriend");

const render = () => {
  contentTarget.innerHTML = `<button class="" id="addFriendButton" value="">Add a Friend</button>`;
};

export const AddNewFriendButton = () => {
  render();
};

export const ShowFriendButton = () => {
  return `<button class="" id="addFriendButton" value="">Add a Friend</button>`
}

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "addFriendButton" || clickEvent.target.id === "showFriendButton") {
    const addFriendButtonEvent = new CustomEvent("addNewFriendButtonClicked");
    eventHub.dispatchEvent(addFriendButtonEvent);
  }
});
