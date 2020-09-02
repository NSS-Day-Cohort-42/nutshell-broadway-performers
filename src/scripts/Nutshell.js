import { useCurrentUser } from "./auth/LoginForm.js";
import { getLocation } from "./weather/WeatherDataProvider.js";
import { AddNewFriendButton } from "./friends/AddNewFriendButton.js";
import { NewFriendEntry } from "./friends/NewFriendEntry.js";
import { SaveFriendButton } from "./friends/SaveFriendButton.js";
import { FriendsList } from "./friends/FriendsList.js";
import { NoteForm } from "./tasks/TaskForm.js";
import { NoteList } from "./tasks/TaskList.js";
import { addNewEventButton } from "./events/AddNewEventButton.js";
import { eventList } from "./events/EventsList.js";
import { eventsForm } from "./events/EventsForm.js";
import { MessagesList } from "./chat/MessagesList.js";
import { messageEntryForm } from "./chat/MessageEntryForm.js";
import { AddNewArticleButton } from "./news/AddNewArticleButton.js";
import { NewArticleEntry } from "./news/NewArticleEntry.js";
import { articleList } from "./news/ArticlesList.js";
import { getUsers, useUsers } from "./auth/UsersDataProvider.js";
import { UserWelcome } from "./auth/UserWelcome.js";
import {getFriends, useFriends} from "./friends/FriendsProvider.js"
// import { weatherEventList } from "./weather/WeatherList.js"

const eventHub = document.querySelector(".container");
let currentUserName;

export const Nutshell = () => {

  //user welcome
   UserWelcome();
    
  //weather
  getLocation();

  // tasks
  NoteForm();
  NoteList();

  //friends
  AddNewFriendButton();
  FriendsList();
  eventHub.addEventListener("addNewFriendButtonClicked", () => {
    NewFriendEntry();
    SaveFriendButton();
  });

  //events
  addNewEventButton();
  eventList();
  eventHub.addEventListener("addNewEventButtonClicked", () => {
    eventsForm();
  });

  // news
  AddNewArticleButton();
  articleList();
  eventHub.addEventListener("addNewArticleButtonClicked", () => {
    NewArticleEntry();
  });

  // chat
  MessagesList();
  messageEntryForm();
};


// let users = []
// let friends = []
// let currentUserId 
// let currentUserObj

// getUsers()
//   .then(getFriends)
//   .then(useCurrentUser)
//         .then(() => {
//           users = useUsers()
//           friends = useFriends()
//           currentUserId = useCurrentUser()
          
//           console.log(
            
            
//           users.find(u => u.id = currentUserId).friends.map(f => f.following).map(userId => users.find(u => u.id === userId)).map(matchingFO => matchingFO.username)
          
          
          
          
//           )
//         }   
//         )