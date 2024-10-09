"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Anime from "./components/Anime";
import Modal from "react-modal";
import Search, { SearchData } from "./components/Search";
import Episodes from "./components/Episodes";

export default function Home() {
  const [results, setResults] = useState<AnimeSearchResult[] | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [anime, setAnime] = useState<AnimeSearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  
  const router = useRouter();  // To handle navigation (redirect)

  // Check for the presence of the cookie when the component loads
  useEffect(() => {
    const userCookie = localStorage.getItem('userCookie');

    // Redirect to login page if the cookie is missing
    if (!userCookie) {
      router.push('/login');
    }
  }, [router]);

  const handleSearch = (data: SearchData) => {
    const userCookie = localStorage.getItem('userCookie'); // Retrieve the cookie from localStorage

    if (!userCookie) {
      alert('No cookie found, please login first.');
      return;
    }

    if (data.query !== "") {
      setSearching(true);

      axios
        .post("/api/search", {
          query: data.query,
          language: data.category.toLowerCase(),
          cookie: userCookie, // Use the cookie from localStorage
        })
        .then((response) => {
          setResults(response.data.items);
          setSearching(false);
        })
        .catch((error) => {
          setSearching(false);
          console.error(error);
        });
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl">Lunasa / Anime</h1>

      <main className="flex flex-col gap-8 row-start-2 items-start">
        <Search onSearch={handleSearch} />
        {!searching ? (
          <>
            <div className="flex flex-wrap gap-8 items-center">
              {results
                ? results.map((r) => {
                    return (
                      <Anime
                        anime={r}
                        setIsOpen={(open) => setIsOpen(open)}
                        setAnime={(anime) => setAnime(anime)}
                      />
                    );
                  })
                : <> Enter a query and search. </>}

              {results != null && results.length > 0 ? (
                <></>
              ) : !results ? (
                <> </>
              ) : (
                <>No results</>
              )}
            </div>
          </>
        ) : (
          <>Searching...</>
        )}
      </main>

      <Modal
        isOpen={modalIsOpen}
        contentLabel="Modal"
        className="bg-black"
        style={{
          overlay: {
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(0,0,0,0.50)",
          },
          content: {
            position: "absolute",
            top: "200px",
            left: "200px",
            right: "200px",
            bottom: "200px",
            border: "1px solid",
            borderColor: "rgb(75, 85, 99)",
            background: "rgba(0,0,0,0.75)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "20px",
            padding: "20px",
          },
        }}
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold">{anime?.title?.toUpperCase()}</h1>
          <button onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <Episodes anime={anime?.link!!} />
      </Modal>
    </div>
  );
}
