import { useCurrentUser } from "./auth/LoginForm.js";
import { AddNewFriendButton } from "./friends/AddNewFriendButton.js";
import { NewFriendEntry } from "./friends/NewFriendEntry.js";
import { SaveFriendButton } from "./friends/SaveFriendButton.js";
import { FriendsList } from "./friends/FriendsList.js";
import { NoteForm } from "./tasks/TaskForm.js";
import { NoteList } from "./tasks/TaskList.js";


import { getLocation } from "./weather/WeatherDataProvider.js";
import { addNewEventButton } from "./events/AddNewEventButton.js";
import { eventList } from "./events/EventsList.js";
import { eventsForm } from "./events/EventsForm.js";
import { MessagesList } from "./chat/MessagesList.js";
import { messageEntryForm } from "./chat/MessageEntryForm.js";

const contentTarget = document.querySelector(".container");
const eventHub = document.querySelector(".container");

export const Nutshell = () => {
    NoteForm()
    NoteList()
        // Render all your UI components here

    getLocation()
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
    // news shit

    // chat shit
    MessagesList();
    messageEntryForm();

};