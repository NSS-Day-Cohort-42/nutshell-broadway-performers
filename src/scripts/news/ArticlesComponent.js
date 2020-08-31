import { NewArticleEntry } from "./NewArticleEntry.js";
const eventHub = document.querySelector(".container")

export const articlesComponent = (articleObj) => {
    return `
    <section class="article" id="entry--${articleObj.id}" class="articles">
        <div class="article__title" id="article_title">${articleObj.article_title}</div>        
        <div class="article__synopsis" id="article_synopsis">${articleObj.article_synopsis}</div>
        <div class="article__url" id="article_url"><a href="${
            articleObj.article_URL
          }" target="_blank">Article Link</a></div>
        <button id="deleteArticle--${articleObj.id}">Delete</button>
        <button id="editArticle--${articleObj.id}">Edit</button>
         </section>
    `
}









eventHub.addEventListener("click", (clickEvent) => {
  
    if (clickEvent.target.id.startsWith("editArticle--")) {
        // NewArticleEntry()
      const [notUsed, articleId] = clickEvent.target.id.split("--");
  
      const editArticle = new CustomEvent("editArticleButtonClicked", {
        detail: {
          articleId: parseInt(articleId),
        },
      });
      eventHub.dispatchEvent(editArticle);
    }
  });