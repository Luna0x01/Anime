export default function (props: AnimeProps) {
    return (
<div className="w-48 h-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-gray-700 overflow-hidden">
    <a href={props.anime.link} className="block h-3/5">
        <img className="w-full h-full object-cover rounded-t-lg" src={props.anime.image} alt={props.anime.title} />
    </a>
    <div className="p-3 h-2/5 gap-[10px] flex flex-col justify-between">
        <p className="font-medium text-gray-700 dark:text-gray-300 text-ellipsis overflow-hidden whitespace-nowrap" title={props.anime.title}>
            {props.anime.title}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap" title={props.anime.released}>
            {props.anime.released}
        </p>
        <a onClick={(event) => { props.setAnime(props.anime); props.setIsOpen(true) }} className="flex flex-row px-3 py-1 text-sm font-medium items-center justify-between bg-zinc-700 hover:bg-zinc-800 rounded-lg">
            <p>View</p>
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>




        // <div className="mx-auto rounded-lg shadow-lg overflow-hidden relative">
        //     <img src={props.anime.image} alt={props.anime.title} className="w-full h-[240px] object-cover rounded-t-lg" />
        //     <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 backdrop-blur-md rounded-b-lg p-2">
        //         <h2 className="text-lg text-gray-100 font-semibold">{props.anime.title}</h2>
        //     </div>
        // </div>
    );
}

interface AnimeProps {
    anime: AnimeSearchResult;
    setAnime: (anime: AnimeSearchResult) => void;
    setIsOpen: (state: boolean) => void;
}