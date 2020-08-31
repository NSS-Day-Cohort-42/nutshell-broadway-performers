export const FriendHTML = (friendUserObj, matchingFriends) => {
  const friendObj = matchingFriends.find((matchingFriendObj) => {
    return friendUserObj.id === matchingFriendObj.following;
  });

  return `  <section class="friend item" id="friendship--${friendObj.id}">
            <div class="name friend__name">
            ${friendUserObj.username}
            </div>
            <button class="button friend__delete delete--button" id="deleteFriend--${friendObj.id}">Delete Friend?</button>

            </section>
    `;
};
