import ChangeUserName from "./ChangeUserName"
import { UserContext } from "./UserContext"
import { useContext } from "react"


export default function Header() {
    const { userName } = useContext(UserContext)

    return (
        <header>Willkommen: {userName}</header>
    )
}