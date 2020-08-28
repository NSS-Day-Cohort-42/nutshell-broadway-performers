import { useCurrentUser } from "../auth/LoginForm.js";
import { saveMessage } from "./MessagesProvider.js";
const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".messageEntryForm");

let currentUser; 

export const messageEntryForm = () => {
    currentUser = useCurrentUser()

    render()
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
        const newMessage = {
            userId: currentUser,
            message: document.querySelector("#messageText").value,
            message_time: new Date()
        }

        saveMessage(newMessage)
    }
})



// {
//     "id": 1,
//     "userId": 1,
//     "message": "who said that",
//     "message_time": "party oclock"
//   },