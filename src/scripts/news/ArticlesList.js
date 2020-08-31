import { useArticles, getArticles, deleteArticle } from "./ArticlesDataProvider.js"
import { articlesComponent } from "./ArticlesComponent.js"
import { useCurrentUser } from "../auth/LoginForm.js"
import { getFriends, useFriends } from "../friends/FriendsProvider.js"
import { getUsers, useUsers } from "../auth/UsersDataProvider.js"
import { FriendsArticlesComponent } from "./FriendsArticlesComponent.js"

const contentTarget = document.querySelector(".articlesList")
const eventHub = document.querySelector(".container")

let articles = []
let currentUserId
let friends = []
let users = []
eventHub.addEventListener("articleStateChanged", () => articleList())

eventHub.addEventListener("click", clickevent => {
    if (clickevent.target.id.startsWith("deleteArticle")) {
        const [prefix, id] = clickevent.target.id.split("--")
        const deleteEvent = new CustomEvent("deleteButtonClicked", {
            detail: {
                id: id
            }
        })
        deleteArticle(id).then(() => {
            articles = useArticles()
            render()
        })
    }
})

eventHub.addEventListener("friendsStateChanged", () => {
    friends = useFriends()
    render()
})

const render = () => {
    currentUserId = useCurrentUser()
    const matchingArticles = articles.filter(articleObj => {
        return articleObj.userId === currentUserId
    })
    const allArticlesToString = matchingArticles.map(articleObj => {
        return articlesComponent(articleObj)
    }).join("")

    //begin epic string of variable definitions to grab all articles for all friends
    const matchingFriends = friends.filter(friendObj => {
        return friendObj.userId === currentUserId
    })

    const matchingFriendsAsUsers = matchingFriends.map(matchingFriendObj => {
        return (users.find(userObj => {
            return matchingFriendObj.following === userObj.id
        }))
    })

    const matchingFriendsUserIdVals = matchingFriendsAsUsers.map(matchingFriendObj => {
        return matchingFriendObj.id
    })

    const matchingUserArticles = articles.filter(articleObj => {
        return (matchingFriendsUserIdVals.includes(articleObj.userId))
    })

    const allMatchingUserArticlestoString = matchingUserArticles.map(matchingUserEventObj => {
        return FriendsArticlesComponent(matchingUserEventObj)
    }).join("")

    contentTarget.innerHTML = `<h2>My Articles:</h2>
                            <div>${allArticlesToString}</div>
                            <h2>Friends Articles:</h2>
                            <div>${allMatchingUserArticlestoString}</div>
                              `
}

export const articleList = () => {
    getArticles()
        .then(getFriends)
        .then(getUsers)
        .then(() => {
            articles = useArticles()
            friends = useFriends()
            users = useUsers()
            render()
        })
}