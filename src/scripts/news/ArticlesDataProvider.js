let articles = []

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const articleStateChangedEvent = new CustomEvent("articleStateChanged")

    eventHub.dispatchEvent(articleStateChangedEvent)
}


export const saveArticle = (articleObj) => {
    return fetch('http://localhost:8088/news', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articleObj)
    })
    .then(getArticles)
    .then(dispatchStateChangeEvent)
}



export const deleteArticle = (articleId) => {
    return fetch(`http://localhost:8088/news/${articleId}` , {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(getArticles)
        .then(dispatchStateChangeEvent)
}

export const saveUpdatedArticle = (updatedArticle) => {
    return fetch(`http://localhost:8088/news/${updatedArticle.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArticle),
    })
      .then(getArticles)
      .then(dispatchStateChangeEvent);
  };


export const useArticles = () => {
    return articles.slice()
}

export const getArticles = () => {
    return fetch('http://localhost:8088/news')
    .then(response => response.json())
    .then(parsedArticles => {
        articles = parsedArticles
    })
    
}
