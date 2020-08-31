import { useCurrentUser } from "../auth/LoginForm.js";
import { saveMessage } from "./MessagesProvider.js";
import { getFriends, useFriends } from "../friends/FriendsProvider.js";
import { getUsers, useUsers } from "../auth/UsersDataProvider.js";
const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".messageEntryForm");

let currentUser; 
let friends = [];
let users = [];
let matchingFriends = []
let matchingFriendsAsUsers = []
let matchingFriendsIds = []
let matchingFriendsUsernames = []

export const messageEntryForm = () => {
    currentUser = useCurrentUser()
    getFriends()
        .then(getUsers)
        .then(() => {
            friends = useFriends()
            users = useUsers()

            render()
        })
}

const render = () => {
    contentTarget.innerHTML = `
    <h2>Enter Chat Message:</h2>
    <fieldset id="messageForm">
    <textarea id="messageText" placeholder="WASSAP"></textarea>
    <button id="submitMessage">Submit</button>
    </fieldset>   `
}


eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitMessage") {
        if (document.querySelector("#messageText").value.startsWith("@")) {
            matchingFriends = friends.filter(friendObj => {
                return (friendObj.userId === currentUser)
            })
            matchingFriendsIds = matchingFriends.map(MFO => {
                return (MFO.following)
            })
            matchingFriendsAsUsers = users.filter(userObj => {
                return (matchingFriendsIds.includes(userObj.id))
            })
            matchingFriendsUsernames = matchingFriendsAsUsers.map(MFUObj => {
                return (MFUObj.username)
            })
            const enteredChatName = document.querySelector("#messageText").value.split(" ")[0].substring(1)
            if (matchingFriendsUsernames.includes(enteredChatName)) {
                alert('NOICE')
            } else {
                alert('you must be following someone as a friend to send a private message!')
            }
        }

        else {
            const newMessage = {
                userId: currentUser,
                message: document.querySelector("#messageText").value,
                message_time: new Date()
            }
            saveMessage(newMessage)
        }


    }
})

eventHub.addEventListener("friendsStateChanged", () => {
    friends = useFriends();
  });
