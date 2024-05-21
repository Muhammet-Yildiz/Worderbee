import { Button, Stack } from '@mui/material'
import { ShuffleIcon } from '@/icons/shuffle';

type actionButtonsType = {
    game: any,
    setGame: any,
    text: string[],
    setText: any,
    handleCheckWord: any,
    messages: any
}

export  function ActionButtons(
    { game, setGame, text, setText, handleCheckWord ,messages }: actionButtonsType
) {
  
  return (
    <Stack
    direction="row"
    alignItems="center"
    spacing={3.5}
    sx={{
      '& button': {
        border: '1px solid #d4dae4',
        borderRadius: 6,
        padding: ' 10px 23px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 13,
        color: 'black',
        '&:hover': {
          border: '1px solid #818995',
          backgroundColor: 'white',
        }
      }

    }}
  >
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => setText(
        (prev:any ) => prev.slice(0, prev.length - 1)
      )}
      size='small'
    >
      {messages.delete}
    </Button>
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        borderRadius: '12px !important',
        width: 45,
        height: 45,
      }}

      onClick={() => setGame(
        (prev: any) => {
          const [first, ...rest] = prev.pangram_display
          return {
            ...prev,
            pangram_display: [first, ...rest.sort(() => Math.random() - 0.5)]
          }
        }
      )}



    ><ShuffleIcon />

    </Button>

    <Button
      variant="outlined"
      color="inherit"

      onClick={() => handleCheckWord(
        game?.allWords || [], text.join('')
      )}
    >
       {messages.enter}
    </Button>

  </Stack>

  )
}


