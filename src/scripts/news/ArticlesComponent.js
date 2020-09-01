import { NewArticleEntry } from "./NewArticleEntry.js";
const eventHub = document.querySelector(".container")

export const articlesComponent = (articleObj) => {
    return `
    <section class="article" id="entry--${articleObj.id}" class="articles">
        <div class="article__title">Article title: ${articleObj.article_title}</div>        
        <div class="article__synopsis"> Caption: ${articleObj.article_synopsis}</div>
        <div class="article__url">${articleObj.article_URL}</div>
        <button id="deleteArticle--${articleObj.id}"><i class="fas fa-trash-alt"></i></button>
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