const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addFriend");

const render = () => {
  contentTarget.innerHTML = `<input id="newFriendEntry" type="text">Enter Friend to Save</input>`;
};

export const NewFriendEntry = () => {
  render();
};
