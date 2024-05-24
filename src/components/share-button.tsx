import { useState } from 'react'
import { alpha, Button } from '@mui/material'

export function ShareButton(  {messages ,currentScore} : {messages: any ,currentScore : number}) {
    const [toggle, setToggle] = useState(false)

    return (
        <Button
            variant="outlined"
            color="inherit"
            size='small'
            sx={{
                backgroundColor:  (theme) => alpha(theme.palette.primary.main, 0.7) ,
                textTransform: 'capitalize',
                border :'none',
                p :'0.52rem 1.3rem',
                transition: '0.3s all',
                borderRadius: '0.4rem',
                fontFamily: 'Nunito , sans-serif !important',
                fontSize: '0.78rem',
                color: 'white',
                '&:hover':{
                    backgroundColor:  (theme) => alpha(theme.palette.primary.main, 0.8) ,
                   
                },
            }}

            onClick={() => {
                setToggle(true)
                setTimeout(() => {
                    setToggle(false)
                }, 3000)
                navigator.clipboard.writeText(
                    `I scored ${currentScore} points in this Worder Bee game 🐝 https://worderbee.netlify.app/. Can you beat my score?`
                )
            } }

        >
            { toggle ? messages.copied : messages.share}
        </Button>
    )
}