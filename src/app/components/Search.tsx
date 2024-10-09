import { useState, useEffect, useRef } from 'react';

export default function (props: ISearchProps) {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("sub");
  

  return (
    <div className="w-full">
        <form className="flex gap-4 w-full" onSubmit={(event) => { event.preventDefault(); props.onSearch({ category: selectedOption as any, query }) }}>
            <input onChange={e => setQuery(e.target.value)} className='w-full hover:bg-zinc-700 outline-none appearance-none text-sm rounded-lg bg-zinc-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-600 px-4 py-2' placeholder='Search' required />
            <select id="countries" onChange={(event) => setSelectedOption(event.target.value)} required className="w-max-[200px] bg-zinc-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-zinc-700 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none">
                <option value="sub" selected>Sub</option>
                <option value="dub">Dub</option>
                <option value="subdub">SubDub</option>
            </select>
            <button type='submit' className='bg-zinc-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-zinc-700 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'>
                Search
            </button>
        </form>
    </div>
  );
}

interface ISearchProps {
    onSearch: (data: SearchData) => void;
}

export interface SearchData {
    query: string;
    category: "sub" | "dub" | "subdub";
}
