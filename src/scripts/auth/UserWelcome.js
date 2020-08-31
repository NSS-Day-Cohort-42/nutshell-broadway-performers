import { useCurrentUser } from "./LoginForm.js";

const contentTarget = document.querySelector(".userWelcome");
let currentUsername = "";

export const UserWelcome = () => {
  currentUsername = useCurrentUser();
  render();
};

const render = () => {
  contentTarget.innerHTML = `<section class="userWelcome">
                                <h2>Welcome,
                                ${currentUsername}</h2>
                                 </section>`;
};
