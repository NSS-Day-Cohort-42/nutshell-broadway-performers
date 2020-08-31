import { getUsers, useUsers } from "../auth/UsersDataProvider.js";
import { useCurrentUser } from "../auth/LoginForm.js";
import { saveArticle, saveUpdatedArticle, useArticles } from "./ArticlesDataProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".addArticle");

let users = [];
let currentUserId;

const render = () => {
  contentTarget.innerHTML = `<fieldset id="article-form">
    <label for="newArticleTitle">News Item Title</label>
    <input id="newArticleTitle" type="text">
    <label for="newsArticleText">Enter Article Details</label>
    <textArea id="newsArticleText" name="newsArticleText" placeholder="Article Details"></textArea>
    <label for="newArticleURL">Enter link URL</label>    
    <input id="newArticleURL">
    <input type="hidden" name="articleId" id="articleId" value="">
    <button id="saveNewArticleButton">Save article</button>
    </fieldset>
  `;
};

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveNewArticleButton") {
      const id = document.querySelector("#articleId").value
    const newArticle = {
      time_added: Date.now(),
      userId: useCurrentUser(),
      article_title: document.querySelector("#newArticleTitle").value,
      article_synopsis: document.querySelector("#newsArticleText").value,
      article_URL: document.querySelector("#newArticleURL").value,
    };

    if (id === "") {
      // No id value, so POST new entry with `saveEntry()`
      // from data provider
      saveArticle(newArticle);
    } else {
      newArticle.id = parseInt(id);
      saveUpdatedArticle(newArticle);
    }
    const articleTitle = document.querySelector("#newArticleTitle");
    const articleSynopsis = document.querySelector("#newsArticleText");
    const articleURL = document.querySelector("#newArticleURL");
    const articleId = document.querySelector("#articleId");
  
    articleTitle.value = ""
    articleSynopsis.value = ""
    articleURL.value = ""
    articleId.value = ""
  }
});

eventHub.addEventListener("editArticleButtonClicked", () => {
    render()
  const articleMatchId = event.detail.articleId;
  const entriesCollection = useArticles();

  const entryToEdit = entriesCollection.find((article) => {
    return articleMatchId === article.id;
  });

  const articleTitle = document.querySelector("#newArticleTitle");
  const articleSynopsis = document.querySelector("#newsArticleText");
  const articleURL = document.querySelector("#newArticleURL");
  const articleId = document.querySelector("#articleId");

  articleTitle.value = entryToEdit.article_title;
  articleSynopsis.value = entryToEdit.article_synopsis;
  articleURL.value = entryToEdit.article_URL;
  articleId.value = articleMatchId;
});

export const NewArticleEntry = () => {
  getUsers().then(() => {
    users = useUsers();
    currentUserId = useCurrentUser();
    render();
  });
};
