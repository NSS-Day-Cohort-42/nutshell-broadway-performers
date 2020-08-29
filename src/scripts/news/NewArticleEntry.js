const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addArticle");

const render = () => {
  contentTarget.innerHTML = `<input id="newArticleEntry" type="text">Enter Article to Save</input>`;
};

export const NewArticleEntry = () => {
  render();
};
