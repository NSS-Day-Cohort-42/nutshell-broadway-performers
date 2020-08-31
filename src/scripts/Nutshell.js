import { useCurrentUser } from "./auth/LoginForm.js";
import { AddNewFriendButton } from "./friends/AddNewFriendButton.js";
import { NewFriendEntry } from "./friends/NewFriendEntry.js";
import { SaveFriendButton } from "./friends/SaveFriendButton.js";
import { FriendsList } from "./friends/FriendsList.js";
import { getLocation, uesCityData, forwardGeoCoder, triggerWeatherEvent } from "./weather/WeatherDataProvider.js";
import { weatherEventList } from "./weather/WeatherList.js"
import { NoteForm } from "./tasks/TaskForm.js";
import { NoteList } from "./tasks/TaskList.js";
import { getLocation } from "./weather/WeatherDataProvider.js";
import { addNewEventButton } from "./events/AddNewEventButton.js";
import { eventList } from "./events/EventsList.js";
import { eventsForm } from "./events/EventsForm.js";
import { MessagesList } from "./chat/MessagesList.js";
import { messageEntryForm } from "./chat/MessageEntryForm.js";
import { AddNewArticleButton } from "./news/AddNewArticleButton.js";
import { NewArticleEntry } from "./news/NewArticleEntry.js";
import { articleList } from "./news/ArticlesList.js";
import { getUsers, useUsers } from "./auth/UsersDataProvider.js";

const contentTarget = document.querySelector(".container");
const eventHub = document.querySelector(".container");
let currentUserName

export const Nutshell = () => {

    getUsers()
        .then(useCurrentUser)
        .then(useUsers)
        .then(() => {
            currentUserName = useUsers().find(userObj => userObj.id === useCurrentUser()).username
            document.querySelector("header").innerHTML = `<h1>Currently Logged In As: ${currentUserName}</h1>`
        })
    //weather shit
    getLocation()
    
    // tasks shit
    NoteForm()
    NoteList()
        // Render all your UI components here

    getLocation()
    weatherEventList()
  
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
    AddNewArticleButton();
    articleList();
    eventHub.addEventListener("addNewArticleButtonClicked", () => {
        NewArticleEntry();
})

    // chat shit
    MessagesList();
    messageEntryForm();

};