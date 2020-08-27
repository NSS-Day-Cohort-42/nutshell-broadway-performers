import { useCurrentUser } from "../auth/LoginForm.js";
import { useUsers, getUsers } from "../auth/UsersDataProvider.js";
import { getFriends, useFriends } from "./FriendsProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".friendsList");
const currentUser = useCurrentUser();
let users = [];
let friends = [];

const render = () => {
  contentTarget.innerHTML = `yeeeehh`;
  const matchingFriends = friends.filter((friendObj) => {
    return friendObj.userId === currentUser;
  });
  debugger;
};

export const FriendsList = () => {
  getUsers()
    .then(getFriends)
    .then(() => {
      users = useUsers();
      friends = useFriends();

      render();
    });
};

//needs to listen for friends state change event to refresh useUsers and UseFriends and and rerender
