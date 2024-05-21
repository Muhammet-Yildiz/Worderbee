import { useState } from 'react'
import { Button } from '@mui/material'

export function ShareButton(  {messages ,currentScore} : {messages: any ,currentScore : number}) {
    const [toggle, setToggle] = useState(false)

    return (
        <Button
            variant="outlined"
            color="inherit"
            size='small'
            sx={{
                backgroundColor: 'lightgreen',
                textTransform: 'capitalize',
                border :'none',
                p :'0.5rem 1rem',
                transition: '0.3s all',
                borderRadius: '0.4rem',
                '&:hover':{
                    backgroundColor: '#74d674',
                },
                letterSpacing: 0.6
               
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