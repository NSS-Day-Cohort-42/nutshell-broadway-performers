import { useCurrentUser } from "./auth/LoginForm.js";
import { AddNewFriendButton } from "./friends/AddNewFriendButton.js";
import { NewFriendEntry } from "./friends/NewFriendEntry.js";

const contentTarget = document.querySelector(".container");
const eventHub = document.querySelector(".container");

export const Nutshell = () => {
  AddNewFriendButton();
  eventHub.addEventListener("addNewFriendButtonClicked", () => {
    NewFriendEntry();
  });
  // Render all your UI components here
};
