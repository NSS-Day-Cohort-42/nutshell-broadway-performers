import { useCurrentUser } from "../auth/LoginForm.js";
import { saveMessage, getMessages, useMessages, updateMessage} from "./MessagesProvider.js";
import { getFriends, useFriends } from "../friends/FriendsProvider.js";
import { getUsers, useUsers } from "../auth/UsersDataProvider.js";
const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".messageEntryForm");

let currentUser; 
let currentUserObject;
let messages = []
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
        .then(getMessages)
        .then(() => {
            friends = useFriends()
            messages = useMessages()
            users = useUsers()
            currentUserObject = users.find(userObj => userObj.id === currentUser)
            render()
        })
}

const render = () => {
    contentTarget.innerHTML = `
    <h2>Enter Chat Message:</h2>
    <fieldset id="messageForm">
    <textarea id="messageText" placeholder="Let your voice be heard"></textarea>
    <button id="submitMessage"><i class="far fa-paper-plane"></i></button>
    <input type="hidden" id="editMessage" name="editMessage" value="">
    </fieldset>   `
}


eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitMessage") {
        if (document.querySelector("#editMessage").value === "") {

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
                    const newMessage = {
                        userId: currentUser,
                        message: `${document.querySelector("#messageText").value} (Private Message to ${enteredChatName})`,
                        message_time: new Date()
                    }
                    saveMessage(newMessage)
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
                document.querySelector("#messageText").value = ""
            }
        }

        else {
            const updatedMessage = {
                id: document.querySelector("#editMessage").value,
                userId: currentUser,
                message: document.querySelector("#messageText").value,
            }
            updateMessage(updatedMessage)
        }
    }
})

eventHub.addEventListener("editMessageButtonClicked", customEvent => {
    messages = useMessages()
    const messageToEdit = messages.find(MO => MO.id === customEvent.detail.messageId)
    document.querySelector("#messageText").value = messageToEdit.message
    document.querySelector("#editMessage").value = messageToEdit.id
})

eventHub.addEventListener("friendsStateChanged", () => {
    friends = useFriends();
  });
