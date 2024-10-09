import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import Episode from "./Episode";

export default function (props: IEpisodesProps) {
    const [episodes, setEpisodes] = useState<any[]>([])
    const userCookie = localStorage.getItem('userCookie');

    useEffect(() => {
        axios.post("/api/episodes", {
            anime: props.anime,
            cookie: userCookie
        }).then(async response => {
            const json = response.data;

            const arr = []

            for (let i = 1; i < json.max; i++) {
                arr.push(i)
            }

            console.log(json.max)
            setEpisodes(arr)
        }).catch(async error => {
            console.error(error)
        })
    }, [])

    return (<>
        {episodes.length == 0 ? <>
            Loading episodes...
        </> : <>
            <div className="flex flex-col gap-4">
                <p>{episodes.length} episodes</p>
                <div className="flex flex-wrap gap-8 items-center">
                    {episodes.map(index =>
                        <>
                            <Episode anime={props.anime} episode={index} />
                        </>
                    )}
                </div>
            </div>
        </>}
    </>)
}

interface IEpisodesProps {
    anime: string;
}