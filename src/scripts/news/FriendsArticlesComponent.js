export const FriendsArticlesComponent = (articleObj) => {
    return `
    <section class="article friendItem" id="entry--${articleObj.id}" class="articles">
        <div class="article__title">${articleObj.article_title}</div>        
        <div class="article__synopsis">${articleObj.article_synopsis}</div>
        <div class="article__synopsis">${articleObj.article_URL}</div>
        <button id="deleteEvent--${articleObj.id}">Delete</button>
         </section>
    `
}