export const FriendHTML = (friendUserObj) => {
  return `<div class="friend">
            ${friendUserObj.username}
            </div>
            <button id="deleteFriend--${friendUserObj.id}">Delete Friend</button>
    `;
};
