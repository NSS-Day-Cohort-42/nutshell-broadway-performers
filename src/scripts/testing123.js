import { getUsers, useUsers } from "./auth/UsersDataProvider.js"

let users = []

export const testFunction = () => {
    getUsers()
        .then(useUsers)
        .then(() => {
            users = useUsers()
        }
        )
    }
    

