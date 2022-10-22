import AuthContext from "./contex";
import {useContext} from "react";

export default function useAuth() {
    const {user, setUser} = useContext(AuthContext);

    return {user, setUser};
}

