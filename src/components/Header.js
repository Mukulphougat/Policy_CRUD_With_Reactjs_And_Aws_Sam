import {Link} from "react-router-dom";

export default function Header(){
    return(
        <div className={"w-full h-16 bg-black flex flex-row"}>
            <div className={"mx-4 w-2/12 h-full flex flex-row justify-between self-start"}>
                <Link to={"/"} className={"text-5xl hover:scale-110 my-1 mx-1 text-white font-extrabold"}>P</Link>
                <Link className={"text-xl hover:text-gray-300 my-auto mx-2 text-gray-400"} to={"/"}>/policies</Link>
                <Link className={"text-xl hover:text-gray-300 my-auto mx-2 text-gray-400"} to={"/createPolicy"}>/createPolicy</Link>
                {/*<Link className={"text-xl hover:text-gray-300 my-auto mx-2 text-gray-400"} to={"/editPolicy"}>/editPolicy</Link>*/}
            </div>
        </div>
    )
}