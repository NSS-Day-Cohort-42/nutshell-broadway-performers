const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".saveFriend");

const render = () => {
  contentTarget.innerHTML = `<button class="" id="saveFriendButton" value="">Save New Friend</button>`;
};

export const SaveFriendButton = () => {
  render();
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "addFriendButton") {
    const addFriendButtonEvent = new CustomEvent("saveFriendButtonClicked");
    eventHub.dispatchEvent(addFriendButtonEvent);
  }
});
