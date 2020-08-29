import { AddNewFriendButton, ShowFriendButton } from "./AddNewFriendButton.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addFriend");

const render = () => {
  contentTarget.innerHTML = `<input id="newFriendEntry" type="text">Enter Friend to Save</input>
                              <button id="closeNewFriendEntry">Close</button>`;
};

export const NewFriendEntry = () => {
  render();
};

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "closeNewFriendEntry") {
    contentTarget.innerHTML = ShowFriendButton()
  }
})