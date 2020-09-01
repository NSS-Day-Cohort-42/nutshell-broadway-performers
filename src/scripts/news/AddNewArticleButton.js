const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addArticle");

const render = () => {
  contentTarget.innerHTML = `<button class="" id="addArticleButton" value=""><i class="fas fa-plus-square"></i> Article</button>`;
};

export const AddNewArticleButton = () => {
  render();
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "addArticleButton") {
    const addArticleButtonEvent = new CustomEvent("addNewArticleButtonClicked");
    eventHub.dispatchEvent(addArticleButtonEvent);
  }
});
