import { useCurrentUser } from "./LoginForm.js";
import { getUsers, useUsers } from "./UsersDataProvider.js";

const contentTarget = document.querySelector(".userWelcome");
let currentUsername = "";

export const UserWelcome = () => {
    getUsers()
        .then(useCurrentUser)
        .then(() => {
            currentUsername = (useUsers().find(userObj => { return userObj.id === useCurrentUser()})).currentUsername
            
            render()
        })
}

const render = () => {
  contentTarget.innerHTML = `<section class="userWelcome">
                                <h2>Welcome,
                                ${currentUsername}</h2>
                                 </section>`;
};
