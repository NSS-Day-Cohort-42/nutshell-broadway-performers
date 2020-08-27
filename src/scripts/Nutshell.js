import { useCurrentUser } from "./auth/LoginForm.js";

const contentTarget = document.querySelector(".container");
const eventHub = document.querySelector(".container");

export const Nutshell = () => {
  contentTarget.innerHTML = "BOUT TO GET THIS NUT";
  console.log(useCurrentUser());
  // Render all your UI components here
};
