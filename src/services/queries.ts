import { calculateGamePoint } from "@/utils";
import { getStorage, setStorage } from "@/utils/local-storage";
import useSWR from "swr";

let lang = 'en'
if (typeof window !== 'undefined') {
    lang = window.location.pathname === '/tr' ? 'tr' : 'en'
}

export function GetCurrentGame() {
    const { data, error } = useSWR(`${lang}/dummyData.json`);

    const randomIndex = data ? Math.floor(Math.random() * data?.pangrams.length) : 0
    let gamesLists = data && getStorage(`${lang}_GamesLists`
        , [
            {
                currentScore: 0,
                pangram: data.pangrams[randomIndex],
                pangram_display: data.pangrams[randomIndex].split(''),
                maxPoint: calculateGamePoint(data.findWords, data.pangrams[randomIndex]).point,
                maxFindWord: calculateGamePoint(data.findWords, data.pangrams[randomIndex]).maxFindWord,
                allWords: data.findWords,
                allPangrams: data.pangrams,
                foundWords: [],
                state: {
                    rank: 0,
                    isWon: false,
                    time: 60,
                }

            }
        ])

    const currentGame = data && gamesLists[gamesLists?.length - 1]


    return {
        data: currentGame,
        isLoading: !error && !data,
        isError: error,
    };

}



export function CheckWord(text: string, allWords: string[]) {

    const result = allWords.includes(text) ? (text.length === 4 ? 1 : text.length) : 0

    if (result) {
        const gamesLists = getStorage(`${lang}_GamesLists`, [])

        setStorage(`${lang}_GamesLists`, gamesLists.map((game: any) => {
            if (game.foundWords.includes(text)) {
                return game
            }
            else {
                let rankListPoints = Array.from({ length: 9 }, (_, i) => (
                    i === 0 ? 0 : Math.floor(((game?.maxPoint || 0) / 8) * i)))

                return {
                    ...game,
                    foundWords: [...game.foundWords, text],
                    currentScore: game.currentScore + result,
                    state: {
                        ...game.state,
                        rank: rankListPoints.findIndex((point: number) => game.currentScore + result < point) - 1,
                        isWon: rankListPoints.findIndex((point: number) => game.currentScore + result < point) === 8,
                        time: 0
                    }
                }
            }
        }))

    }

    return result
}



export function CreateNewGame() {

    const gamesLists = getStorage(`${lang}_GamesLists`, [])

    const avaliablePangrams = gamesLists[0].allPangrams.filter((pangram: string) => !gamesLists.map((game: any) => game.pangram).includes(pangram))

    const randomIndex = Math.floor(Math.random() * avaliablePangrams.length)


    setStorage(`${lang}_GamesLists`, [
        ...gamesLists,
        {
            currentScore: 0,
            pangram: avaliablePangrams[randomIndex],
            pangram_display: avaliablePangrams[randomIndex]?.split(''),
            maxPoint: calculateGamePoint(gamesLists[0].allWords, avaliablePangrams[randomIndex]).point,
            maxFindWord: calculateGamePoint(gamesLists[0].allWords, avaliablePangrams[randomIndex]).maxFindWord,
            allWords: gamesLists[0].allWords,
            allPangrams: gamesLists[0].allPangrams,
            foundWords: [],
            state: {
                rank: 0,
                isWon: false,
                time: 60,
            }
        }
    ])


    return {
        data: gamesLists[gamesLists.length - 1],
    }

}
