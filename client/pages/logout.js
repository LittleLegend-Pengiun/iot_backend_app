import { setCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function Login() {
    const router = useRouter();
    setCookie("jwt-token", "");
    setCookie("username", "");
    router.replace("/login");


    return (<div></div>);
}