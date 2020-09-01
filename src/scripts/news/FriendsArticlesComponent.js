export const FriendsArticlesComponent = (articleObj) => {
    return `
    <section class="article friendItem" id="entry--${articleObj.id}" class="articles">
        <div class="article__title">Article title: ${articleObj.article_title}</div>        
        <div class="article__synopsis"> Caption: ${articleObj.article_synopsis}</div>
        <div class=article__link"><a href="${articleObj.article_URL}" target="__blank">Article Link</a></div>
        <div class="article__url">${articleObj.article_URL}</div>
        
         </section>
    `
}