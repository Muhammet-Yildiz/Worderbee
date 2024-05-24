"use client"
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameBeginModal } from '@/components/game-begin-modal';
import { ActionButtons } from '@/components/action-buttons';
import { BlockStepper } from '@/components/block-stepper';
import { BlockWordsSelect } from '@/components/block-words-select';
import { HexagonGrid } from '@/components/hexagon-grid';
import { LettersDisplay } from '@/components/letters-display';
import { ShareButton } from '@/components/share-button';
import { CheckWord, GetCurrentGame } from '@/services/queries';
import { alpha, Box, Button, Stack, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

type currentGameType = {
  pangram: string,
  pangram_display: string[],
  maxPoint: number,
  foundWords: string[],
  maxFindWord: number,
  currentScore: number,
  allWords: string[],
  state: {
    rank: number,
    isWon: boolean,
    time: number,
  }
}


export default function MainContent( { messages }: { messages: any } ) {
  const prevGameRef = useRef(null);

  const [text, setText] = useState<string[]>([])

  const { data: currentGame, isLoading, isError } = GetCurrentGame()

  const [gameStart, setGameStart] = useState<boolean>(false)

  const [game, setGame] = useState<currentGameType | null>(null)


  const gameOver = useCallback(() => {
    setGameStart(false)
  }, [])

  useEffect(() => {
    if (currentGame && prevGameRef.current !== currentGame.pangram) {
      setGame(currentGame)
      prevGameRef.current = currentGame.pangram;
    }
  }, [currentGame]);


  const handleCheckWord = (
    allWords: string[], text: string
  ) => {
    if (text.length < 4) {

      toast( messages.alertMsg.shortWord
      , {
        duration: 1300,
        icon: '🚀',
        style: {
          background: '#E4EAF3',
          fontSize: '13.5px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif'
        },
      });
      setText([])
      return
    }
    if (game?.pangram_display[0] &&
      !text.includes(game?.pangram_display[0])
    ) {
      toast(messages.alertMsg.missingWord, {
        duration: 1300,
        icon: '⚡',
        style: {
          background: '#E4EAF3',
          fontSize: '13.5px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif'
        }
      })
      setText([])
      return
    }


    const result = CheckWord(text, allWords)
    if (result) {
      if (game && game?.foundWords.includes(text)) {
        toast.error(` ${text} ${messages.alertMsg.alreadyExist}`)
        setText([])
        return
      }
      let rankListPoints = Array.from({ length: 9 }, (_, i) => (
        i === 0 ? 0 : Math.floor(((game?.maxPoint || 0) / 8) * i)))

      setGame(
        (prev: any) => {
          return {
            ...prev,
            foundWords: [...prev.foundWords, text],
            currentScore: prev.currentScore + result,
            state: {
              ...prev.state,
              isWon: prev.maxPoint <= prev.currentScore + result,
              rank: rankListPoints.findIndex((v, i) => v > (prev.currentScore || 0) + result) - 1,
              time: 0,
            }
          }
        }
      )
      toast.success( ` ${text}  ${messages.alertMsg.success}  `
      )
    }
    else {
      toast(messages.alertMsg.notFound , {
        duration: 1300,
        icon: '☃️',
        style: {
          background: '#E4EAF3',
          fontSize: '13.5px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif'
        }
      })
    }
    setText([])

  };

  if (isLoading) return 

  return (
    <Stack
      spacing={1}
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        height: '644px',
        backgroundColor :'background.default'
      }}
    >

      <GameBeginModal
        game={game}
        setGame={setGame}
        gameStart={gameStart}
        setGameStart={setGameStart}
        messages={messages.Beginmodal}
      />

      <BlockStepper
        rank={game?.state.rank || 0}
        maxPoint={game?.maxPoint || 0}
        currentScore={game?.currentScore || 0}
        gameStart={gameStart}
        gameOver={gameOver}
        messages={messages.ranks}
      />

      <BlockWordsSelect
        foundWords={game?.foundWords || []}
        messages = {messages.main}
      />

      <LettersDisplay text={text} game={game} />

      <Box sx={{ height: 0 }} />

      <HexagonGrid
        letters={game?.pangram_display || []}
        setText={setText}
      />

      <ActionButtons
        setText={setText}
        text={text}
        setGame={setGame}
        game={game}
        handleCheckWord={handleCheckWord}
        messages={messages.main}
      />
      <Box sx={{ height: 12 }} />
      <ShareButton
        messages={messages.main}
        currentScore={game?.currentScore || 0}
      />
      

    </Stack>
  )
}