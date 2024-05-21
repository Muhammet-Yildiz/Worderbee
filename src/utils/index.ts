export const calculateGamePoint = (findWords: string[], pangram: string) => {

    let point = 0

    let maxFindWord = 0

    findWords.forEach(word => {
        if (word === pangram) {
            point += 7
            maxFindWord += 1
        } else {

            const firstLetter = pangram[0]
            const isWord = word.includes(firstLetter)

            if (isWord) {
                let pangramSplit = pangram.split('')

                let count = 0

                for (let i = 0; i <= pangramSplit.length - 1; i++) {
                    count += word.split('').filter(c => c === pangramSplit[i]).length
                }

                if (count > 3) {
                    if (word.length === 4) {
                        point += 1
                    }
                    else {
                        point += word.length
                    }
                    maxFindWord += 1
                }
            }
            else {
                point += 0
            }
        }
    })

    return {
        point,
        maxFindWord
    }

}