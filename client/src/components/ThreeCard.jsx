import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMobContent } from "../state";

const ThreeCard = () => {

    const dispatch = useDispatch();
    const [ content, setContent ] = useState(useSelector(state => state.mobContent));

    return(
        <div className="flex justify-between items-center space-x-3 lg:hidden">
            <div onClick={() =>{ dispatch(setMobContent({mobContent: "posts"})); setContent("posts")}} className={`bg-white hover:bg-blue-100 text-blue-500 shadow rounded-xl p-3 cursor-pointer w-full text-center ${content === "posts" ? "font-semibold" : ""}`}>
                <p>post</p>
                <span className="material-symbols-outlined">event</span>
            </div>
            <div onClick={() => {dispatch(setMobContent({mobContent: "friends"})); setContent("friends")}} className={`bg-white hover:bg-green-100 text-green-500 shadow rounded-xl p-3 w-full cursor-pointer text-center ${content === "friends" ? "font-semibold" : ""}`}>
                <p>Friends</p>
                <span className="material-symbols-outlined">diversity_3</span>
            </div>
            <div onClick={() => {dispatch(setMobContent({mobContent: "groups"})); setContent("groups")}} className={`bg-white hover:bg-yellow-100 text-yellow-500 shadow rounded-xl p-3 w-full cursor-pointer text-center ${content === "groups" ? "font-semibold" : ""}`}>
                <p>Groups</p>
                <span className="material-symbols-outlined">groups</span>
            </div>
        </div>
    )
}

export default ThreeCard;