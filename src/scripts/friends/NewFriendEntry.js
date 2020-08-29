import { AddNewFriendButton, ShowFriendButton } from "./AddNewFriendButton.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addFriend");

const render = () => {
  contentTarget.innerHTML = `<label for="newFriendEntry">Enter Username to Add</label><input id="newFriendEntry" name="newFriendEntry" type="text"></input>
                              <button id="closeNewFriendEntry">Close</button>`;
};

export const NewFriendEntry = () => {
  render();
};

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "closeNewFriendEntry") {
    contentTarget.innerHTML = ShowFriendButton()
    document.querySelector(".saveFriend").innerHTML = ""
  }
})