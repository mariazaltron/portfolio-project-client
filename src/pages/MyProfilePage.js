import { NavBar } from "../components/NavBar";
import { NavProfilePage } from "../components/NavProfilePage"

export const MyProfilePage = () => {
  return (
    <div>
        <NavBar/>
        <div style={{"display": "flex"}}>
            <NavProfilePage/>
            <div>
            ola tudo bem
            </div>
        </div>
    </div>

  )
};
