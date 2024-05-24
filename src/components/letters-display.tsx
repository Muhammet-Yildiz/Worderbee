import { Box, Typography } from '@mui/material'
import React from 'react'

export function LettersDisplay(
    { text, game }: { text: string[], game: any }
) {
  return (
    <Box
        sx={{
          height: 35,
          position: 'relative',
          display: 'flex',
          '& span': {
            width: 5,
            height: 35,
            backgroundColor:  (theme) => theme.palette.primary.main,
            animation: 'cursor 1s  infinite',
          },
          '@keyframes cursor': {
            '0%': { opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0 },
          }
        }}
      >
        {
          text.map((letter, index) => (
            <Typography variant="h6"
              fontSize={27}
              key={index}
              fontWeight="bold"
              letterSpacing={2}
              sx={{
                color:
                  game?.pangram_display[0]
                    === letter ? 
                    (theme) => theme.palette.primary.main
                    :  (theme) => theme.palette.text.primary,
                textTransform: 'uppercase',
                fontFamily: 'Nunito , sans-serif !important',
                mr: 0.4,
              }}
            >
              {letter}

            </Typography>
          ))

        }

        <span />

      </Box>
  )
}