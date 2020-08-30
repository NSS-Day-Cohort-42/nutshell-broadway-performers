import { render } from "../../weather/WeatherList"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".privateChatList")

export const PrivateChatList = () => {
    render()
}

const render = () => {
    contentTarget.innerHTML = `throw it on the DOM`
}