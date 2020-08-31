import { editArticleEntry } from "./EditArticle.js"

export const articlesComponent = (articleObj) => {
    editArticleEntry()
    return `
    <section class="article" id="entry--${articleObj.id}" class="articles">
        <div class="article__title" id="article_title">${articleObj.article_title}</div>        
        <div class="article__synopsis" id="article_synopsis">${articleObj.article_synopsis}</div>
        <div class="article__url" id="article_url">${articleObj.article_URL}</div>
        <button id="deleteArticle--${articleObj.id}">Delete</button>
        <button id="editArticle--${articleObj.id}">Edit</button>
         </section>
    `
}