import { useCurrentUser } from "../auth/LoginForm.js";
import { saveMessage } from "./MessagesProvider.js";
import { getFriends, useFriends } from "../friends/FriendsProvider.js";
const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".messageEntryForm");

let currentUser; 
let matchingFriends = []
let matchingFriendsIds = []
let matchingFriendsUsernames = []

export const messageEntryForm = () => {
    currentUser = useCurrentUser()
    getFriends()
        .then(() => {
            matchingFriends = useFriends().filter(friendObj => {
                return (friendObj.userId === currentUser)
            })
            matchingFriendsIds = matchingFriends.map(MFO => {
                return (MFO.following)
            })  
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
            alert('whew')
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


