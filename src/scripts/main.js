import { LoginForm, useCurrentUser } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { Nutshell } from "./Nutshell.js";
import { getMessages, useMessages } from "./chat/MessagesProvider.js";
import { getCurrentWeather, useCurrentWeather } from "./weather/ForecastDataProvider.js";


const eventHub = document.querySelector(".container");

if (sessionStorage.getItem("activeUser")) {
    Nutshell();
    console.log(`${useCurrentUser()}`);
} else {
    LoginForm();
    RegisterForm();
}

eventHub.addEventListener("userAuthenticated", () => {
    Nutshell();
    console.log(useCurrentUser());
});

/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/
