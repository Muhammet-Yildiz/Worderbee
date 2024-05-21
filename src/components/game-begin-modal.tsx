"use client";
import { nunito, tiltWarp } from '@/lib/fonts';
import { Stack, Button, Fade, Modal, Box, Backdrop, Typography, styled } from '@mui/material';
import { CreateNewGame } from '@/services/queries';

type currentGameType = {
    pangram: string,
    pangram_display: string[],
    maxPoint: number,
    foundWords: string[],
    currentScore: number,
    maxFindWord: number,
    allWords: string[],
    state: {
        rank: number,
        isWon: boolean,
        time: number,
    }
}
type Props = {
    gameStart: boolean,
    setGameStart: (value: boolean) => void,
    game: currentGameType | null,
    setGame: (value: currentGameType | null) => void,
    messages: any
}


const PlayButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'lightgreen',
    color: 'white',
    padding: '8px 57px',
    borderRadius: '20px',
    fontSize: '13.9px',
    '&:hover': {
        backgroundColor: '#74d674',
    },
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    border: '4px solid #D8DEE9',
    filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))',
    transform: 'rotate(-2deg)',
    fontWeight: 'bold',
    lineHeight: 1.5,
}));

export function GameBeginModal({ gameStart, setGameStart, game, setGame, messages }: Props
) {

    const handleCreateNewGame = async () => {
        const { data } = await CreateNewGame();
        setGame(data)
        setGameStart(true)
    }


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!gameStart}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{
                backdropFilter: 'blur(3px)',
            }}
        >
            <Fade in={!gameStart}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    height: 500,
                    borderRadius: 2,
                    bgcolor: '#d8dee9',
                    p: 4,
                    border: 'none ',
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>

                    <Typography id="modal-title" variant="h6" component="h2"

                        className={tiltWarp.className}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.8rem',
                            letterSpacing: '0.5px',
                            color: '#525151',
                        }}
                    >
                        {messages.title}
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={1.1}
                        sx={{
                            mt: 3,
                            mb: 2.3,
                            '& h6': {
                                filter: game && game.state.time === 60 ? 'blur(4.2px)' : 'none',
                            }
                        }}
                    >

                        {
                            game && game.pangram_display.map((letter, index) => (
                                <Typography variant="h6"
                                    fontSize={27}
                                    key={index}
                                    fontWeight="bold"
                                    sx={{
                                        color: index === 0 ? 'lightgreen' : 'black',
                                        fontFamily: 'Nunito , sans-serif !important',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        borderRadius: 2,
                                        border: '2px solid #D8DEE9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 33,
                                        width: 33,
                                        textAlign: 'center',
                                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                        filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))',
                                        fontSize: '1.25rem',
                                    }}
                                >
                                    {letter.toUpperCase()}
                                </Typography>
                            ))
                        }

                    </Stack>
                    {
                        game && (
                            <Typography variant="overline"
                                fontSize={12.3}
                                fontWeight="bold"
                                sx={{
                                    textTransform: 'capitalize',
                                    backgroundColor: ' lightgreen',
                                    px: 4,
                                    borderRadius: 2,
                                }}
                            >
                                {game?.maxFindWord}   {messages.words}   |  {game?.maxPoint}   {messages.points}
                            </Typography>
                        )

                    }

                    <Stack
                        direction='row'
                        justifyContent='center '
                        spacing={3.6}
                        sx={{
                            mt: 4,
                            mb: 1.6,
                            width: '100%'
                        }}
                    >
                        {[1, 2, 3].map((item, index) => (

                            <Box
                                key={index}
                                sx={{
                                    backgroundColor: 'white',
                                    width: '22%',
                                    height: 110,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography
                                    fontSize={11.4}
                                    fontWeight="bold"
                                    sx={{
                                        textTransform: 'capitalize',
                                        backgroundColor: ' #d6d4d4',
                                        px: 4,
                                        py: 0.6,
                                        textAlign: 'center',
                                        color: '#545454',
                                        minHeight: 33,
                                        alignItems: 'center',
                                    }}
                                >
                                    {item === 1 ?
                                        messages.foundWords : item === 2 ? messages.currentScore :
                                            messages.time
                                    }
                                </Typography>

                                <Typography variant="h6"
                                    fontSize={30}
                                    fontWeight="bold"
                                    sx={{
                                        textTransform: 'capitalize',
                                        backgroundColor: ' white',
                                        px: 4,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        pt: 1,
                                        color: '#545454',
                                        position: 'relative',
                                        '& span#sec , span#point': {
                                            position: 'absolute',
                                            bottom: -3,
                                            right: 6,
                                            fontSize: 11,
                                            textTransform: 'lowercase',
                                            backgroundColor: ' lightgreen',
                                            px: 0.3,
                                            borderRadius: 1
                                        },
                                        '& span#point': {
                                            display: item === 2 ? 'block' : 'none',
                                        },
                                        '& span#sec': {
                                            display: item === 3 ? 'block' : 'none',
                                        }

                                    }}
                                >
                                    {item === 1 ? game?.foundWords.length : item === 2 ? game?.currentScore : 60}

                                    <span id='sec'
                                    >
                                        {messages.sec}
                                    </span>
                                    <span id='point'
                                    >
                                        {messages.points}
                                    </span>
                                </Typography>
                            </Box>

                        ))}

                    </Stack>


                    {
                        game && game.state.isWon && (
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                Congratulation! You have found all the words.
                            </Typography>
                        )
                    }

                    {
                        game && game.state.isWon ? (
                            <PlayButton
                                onClick={handleCreateNewGame}
                            >
                                {messages.newgame}
                            </PlayButton>
                        ) : (
                            <Stack
                                direction='row'
                                spacing={2}
                                sx={{
                                    mt: 16
                                }}
                            >
                                {
                                    game?.state.time === 0 && (
                                        <PlayButton
                                            onClick={() => setGameStart(true)}

                                        >
                                            {messages.tryAgainGame}
                                        </PlayButton>
                                    )
                                }
                                <PlayButton
                                    onClick={() => {
                                        if (game?.state.time === 60) {
                                            setGameStart(true)
                                        } else {
                                            handleCreateNewGame()
                                        }
                                    }}
                                >

                                    {
                                        game?.state.time === 60 ?
                                            messages.startgame
                                            : messages.newgame
                                    }

                                </PlayButton>
                            </Stack>

                        )
                    }

                </Box>
            </Fade>
        </Modal>
    )
}