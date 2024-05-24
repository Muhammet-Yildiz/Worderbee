"use client";
import { tiltWarp } from '@/lib/fonts';
import { Stack, Button, Fade, Modal, Box, Backdrop, Typography, styled, alpha } from '@mui/material';
import { CreateNewGame } from '@/services/queries';
import { useSettings } from '@/contexts/settings-context';
import { SunIcon } from '@/icons/sun';
import { MoonIcon } from '@/icons/moon';
import { ChangeTintColor } from './change-tint-color';

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
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '8px 57px',
    borderRadius: '20px',
    fontSize: '13.9px',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.8),
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

    const { settings, saveSettings } = useSettings();

    const handleCreateNewGame = async () => {
        const { data } = await CreateNewGame();
        setGame(data)
        setGameStart(true)
    }
    const handleSwitchTheme = () => {
        saveSettings({
            ...settings,
            theme: settings.theme === 'light' ? 'dark' : 'light'
        });
    };

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
                    height: 485,
                    borderRadius: 2,
                    bgcolor: settings.theme === 'light' ?
                        (theme) => theme.palette.background.paper :
                        (theme) => theme.palette.background.default,
                    backgroundImage: 'none',
                    border: (theme) => "2px solid" + theme.palette.text.disabled,
                    p: 4,
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 2,
                            left: 2,
                            cursor: 'pointer',
                            backgroundColor: settings.theme === 'light' ? "white" : (theme) => alpha(theme.palette.primary.main, 0.16),
                            border: (theme) => "2px solid" + theme.palette.text.disabled,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1,
                            borderRadius: 2,
                        }}
                        onClick={handleSwitchTheme}
                    >
                        {
                            settings.theme === 'light' ? <SunIcon
                                sx={{
                                    fill: settings.tintColor,
                                    fontSize: 20,
                                }}
                            /> : <MoonIcon
                                sx={{
                                    fontSize: 20,
                                    '& path': {
                                        fill: '#bcbec2'
                                    }
                                }}
                            />
                        }
                    </Box>
                    <ChangeTintColor />


                    <Typography id="modal-title" variant="h6" component="h2"
                        className={tiltWarp.className}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.8rem',
                            letterSpacing: '0.5px',
                            color: 'text.primary',
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
                                        color: index === 0 ? 'primary.main' : 'text.primary',
                                        fontFamily: 'Nunito , sans-serif !important',
                                        backgroundColor: settings.theme === 'light' ? "white" : (theme) => alpha(theme.palette.primary.main, 0.16),
                                        padding: '0 5px',
                                        borderRadius: 2,
                                        border: (theme) => "2px solid" + theme.palette.text.disabled,
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
                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                                    px: 4,
                                    borderRadius: 2,
                                    color: 'text.primary',
                                    mt: 1
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
                                    borderRadius: '3px 3px 0 0',

                                }}
                            >
                                <Typography
                                    fontSize={11.4}
                                    fontWeight="bold"
                                    sx={{
                                        textTransform: 'capitalize',
                                        backgroundColor:
                                            settings.theme === 'light' ? (theme) => alpha(theme.palette.primary.main, 0.16) : (theme) => alpha(theme.palette.primary.main, 0.4),
                                        px: 4,
                                        py: 0.6,
                                        textAlign: 'center',
                                        color: '#545454',
                                        minHeight: 33,
                                        alignItems: 'center',
                                        borderRadius: '3px 3px 0 0',

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
                                        px: 4,
                                        textAlign: 'center',
                                        pt: 1,
                                        color: '#545454',
                                        position: 'relative',
                                        '& span#sec , span#point': {
                                            position: 'absolute',
                                            bottom: 3,
                                            right: 6,
                                            fontSize: 11,
                                            textTransform: 'lowercase',
                                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.4),
                                            px: 0.3,
                                            borderRadius: 1
                                        },
                                        '& span#point': {
                                            display: item === 2 ? 'block' : 'none',
                                        },
                                        '& span#sec': {
                                            display: item === 3 ? 'block' : 'none',
                                        },
                                        // border:'2px solid red',
                                        height: 58,
                                        backgroundColor: settings.theme === 'light' ? "white" : (theme) => alpha(theme.palette.text.primary, 0.7),

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
                                spacing={3}
                                sx={{
                                    mt: 16
                                }}
                            >
                                {
                                    game?.state.time === 0 && (
                                        <PlayButton onClick={() => setGameStart(true)} >
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
                                    {game?.state.time === 60 ? messages.startgame : messages.newgame}
                                </PlayButton>
                            </Stack>

                        )
                    }

                </Box>
            </Fade>
        </Modal>
    )
}