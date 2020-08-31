export const articlesComponent = (articleObj) => {
    return `
    <section class="article" id="entry--${articleObj.id}" class="articles">
        <div class="article__title">Article title: ${articleObj.article_title}</div>        
        <div class="article__synopsis"> Caption: ${articleObj.article_synopsis}</div>
        <div class="article__url">${articleObj.article_URL}</div>
        <button id="deleteArticle--${articleObj.id}">Delete</button>
         </section>
    `
}