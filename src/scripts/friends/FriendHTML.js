export const FriendHTML = (friendUserObj, matchingFriends) => {
  const friendObj = matchingFriends.find((matchingFriendObj) => {
    return friendUserObj.id === matchingFriendObj.following;
  });

  return `  <section class="friend item" id="friendship--${friendObj.id}">
            <div class="friend__name">
            ${friendUserObj.username}
            </div>
            
            <button class="button friend__deleteButton" id="deleteFriend--${friendObj.id}">Delete Friend?</button>

            </section>
    `;
};
