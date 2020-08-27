export const FriendHTML = (friendUserObj, matchingFriends) => {
  const friendObj = matchingFriends.find((matchingFriendObj) => {
    return friendUserObj.id === matchingFriendObj.following;
  });

  return `<div class="friend">
            ${friendUserObj.username}
            </div>
            <button id="deleteFriend--${friendObj.id}">Delete Friend</button>
    `;
};
