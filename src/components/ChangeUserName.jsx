import { useContext } from "react"
import { UserContext } from "./UserContext"


export default function ChangeUserName() {
    const {useName, setUserName} = useContext(UserContext);
    const {email, setEmail} = useContext(UserContext)

    return (
        // <button onClick={() => setUserName("Basti") } >Ändere Benutzernamen</button>


        <>
        <label>
            Username
            <input type="text" value= {useName} onChange={(e) => setUserName(e.target.value)}/>
        </label>
        <label>
            E-Mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        </>
    )
    
}