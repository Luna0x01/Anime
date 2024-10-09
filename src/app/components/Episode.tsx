import axios from "axios";

export default function (props: IEpisodeProps) {
    const userCookie = localStorage.getItem('userCookie');


    function handleClick(event: any) {
        axios.post("/api/download", {
            anime: props.anime,
            episode: props.episode,
            cookie: userCookie
        }).then(async response => {
            window.open(response.data.url, "_blank")
        }).catch(async error => {
            console.error(error)
        })
    }

    return (<>
        <a href="#">
            <button onClick={handleClick} className="bg-zinc-600 hover:bg-zinc-800 rounded-lg px-4 py-2">{props.episode}</button>
        </a>
    </>)
}

interface IEpisodeProps {
    anime: string;
    episode: any;
}