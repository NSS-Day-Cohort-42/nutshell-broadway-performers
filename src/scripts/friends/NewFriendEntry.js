import { AddNewFriendButton, ShowFriendButton } from "./AddNewFriendButton.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addFriend");

const render = () => {
  contentTarget.innerHTML = `<label for="newFriendEntry"></label><input id="newFriendEntry" name="newFriendEntry" type="text" placeholder="Enter Username to Add"></input>
                              <button id="closeNewFriendEntry"><i class="fas fa-window-close"></i></button>`;
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