import { getUsers, useUsers } from "../auth/UsersDataProvider.js";
import { useCurrentUser } from "../auth/LoginForm.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addArticle");

let users = []
let currentUserId

const render = () => {
    contentTarget.innerHTML = `<fieldset>
    <label for="newArticleTitle">News Item Title</label>
    <input id="newArticleTitle" type="text">
    <label for="newsArticleText">Enter Article Details</label>
    <textArea id="newsArticleText" name="newsArticleText" placeholder="Article Details"></textArea>
    <label for="newArticleURL">Enter link URL</label>    
    <input id="newArticleURL">
    <button id="saveNewArticleButton">Save article</button>
    </fieldset>
  `;
};

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "#saveNewArticleButton") {
        const newArticle = {
            time_added: Date.now(),

        }
    }
})

export const NewArticleEntry = () => {
    getUsers()
        .then(() => {
            users = useUsers();
            currentUserId = useCurrentUser();
            render();
    }
    )
};
