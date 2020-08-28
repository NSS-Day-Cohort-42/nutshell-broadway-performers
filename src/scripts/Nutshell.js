import { useCurrentUser } from "./auth/LoginForm.js";
import { AddNewFriendButton } from "./friends/AddNewFriendButton.js";
import { NewFriendEntry } from "./friends/NewFriendEntry.js";
import { SaveFriendButton } from "./friends/SaveFriendButton.js";
import { FriendsList } from "./friends/FriendsList.js";
import { getLocation, uesCityData, forwardGeoCoder, triggerWeatherEvent } from "./weather/WeatherDataProvider.js";
import { weatherEventList } from "./weather/WeatherList.js"

const contentTarget = document.querySelector(".container");
const eventHub = document.querySelector(".container");

export const Nutshell = () => {
    // Render all your UI components here

    getLocation()
    weatherEventList()

//     let city = "nashville"

// triggerWeatherEvent(city)
  

  //friends shit
  AddNewFriendButton();
  FriendsList();
  eventHub.addEventListener("addNewFriendButtonClicked", () => {
    NewFriendEntry();
    SaveFriendButton();
  });
};
