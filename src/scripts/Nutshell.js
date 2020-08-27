import { useCurrentUser } from "./auth/LoginForm.js";
import { AddNewFriendButton } from "./friends/AddNewFriendButton.js";
import { NewFriendEntry } from "./friends/NewFriendEntry.js";
import { SaveFriendButton } from "./friends/SaveFriendButton.js";
import { FriendsList } from "./friends/FriendsList.js";
import { eventsForm } from "./events/EventsForm.js";
import { eventList } from "./events/EventsList.js";
import { addNewEventButton } from "./events/AddNewEventButton.js";

const contentTarget = document.querySelector(".container");
const eventHub = document.querySelector(".container");

export const Nutshell = () => {
    //friends shit
    AddNewFriendButton();
    FriendsList();
    eventHub.addEventListener("addNewFriendButtonClicked", () => {
        NewFriendEntry();
        SaveFriendButton();
    });
    //event shit
    addNewEventButton()
    eventList()
    eventHub.addEventListener("addNewEventButtonClicked", () => {
        eventsForm()
    })
};