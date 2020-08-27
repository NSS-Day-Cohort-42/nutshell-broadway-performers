const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addFriend");

const render = () => {
  contentTarget.innerHTML = `<button class="" id="addFriendButton" value="">Add a Friend</button>`;
};

export const AddNewFriendButton = () => {
  render();
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "addFriendButton") {
    const addFriendButtonEvent = new CustomEvent("addNewFriendButtonClicked");
    eventHub.dispatchEvent(addFriendButtonEvent);
  }
});
