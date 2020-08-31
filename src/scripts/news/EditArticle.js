import { useArticles } from "./ArticlesDataProvider.js";
import { NewArticleEntry } from "./NewArticleEntry.js";


const eventHub = document.querySelector(".news")


eventHub.addEventListener("click", (clickEvent) => {
  
    if (clickEvent.target.id.startsWith("editArticle--")) {
        NewArticleEntry()
      const [notUsed, articleId] = clickEvent.target.id.split("--");
  
      const editArticle = new CustomEvent("editArticleButtonClicked", {
        detail: {
          articleId: parseInt(articleId),
        },
      });
      eventHub.dispatchEvent(editArticle);
    }
  });

  export const editArticleEntry = () => {
    eventHub.addEventListener("editArticleButtonClicked", () => {
      const articleMatchId = event.detail.articleId;
      const entriesCollection = useArticles();
  
      const entryToEdit = entriesCollection.find((article) => {
        return articleMatchId === article.id;
      });

      console.log(entryToEdit)
  
      const articleTitle = document.querySelector("#article_title");
      const articleSynopsis = document.querySelector("#article_synopsis");
      const articleURL = document.querySelector("#article_url");
      //const articleId = document.querySelector("#")

  
      articleTitle.value = entryToEdit.article_title;
      articleSynopsis.value = entryToEdit.article_synopsis;
      articleURL.value = entryToEdit.article_URL;
      //editEntryId.value = articleMatchId
    });
  };