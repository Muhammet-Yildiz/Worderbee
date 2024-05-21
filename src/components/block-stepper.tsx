import React, { useEffect } from 'react'
import { Box, Container, Stack, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import { CountdownTimer } from './countdown-timer'

const ranks = ['beginner', 'novice', 'okay', 'good', 'solid', 'great', 'advanced', 'expert', 'master']

type BlockStepperProps = {
  rank: number,
  maxPoint: number,
  currentScore: number,
  gameStart: boolean,
  gameOver: () => void,
  messages: any
}


export function BlockStepper({ rank, maxPoint, currentScore, gameStart, gameOver, messages }: BlockStepperProps) {

  const [rankList, setRankList] = React.useState([] as { rank: string, point: number }[])

  const [activeStep, setActiveStep] = React.useState(0)

  useEffect(() => {
    setActiveStep((maxPoint !== currentScore && rank === 7) ? 6 : rank)
  }, [rank])


  useEffect(() => {
    setRankList(
      ranks.map((v, i) => {
        return {
          rank: v,
          point: i === 0 ? 0 : Math.floor((maxPoint / 8) * i),
        }
      })
    )

  }, [maxPoint])


  return (
    <Container
      maxWidth='sm'
      sx={{
        position: 'relative',
        marginTop: '20px !important',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2} direction='column'
      >
        <Typography variant='h5'
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            lineHeight: 0.1,
            fontFamily: 'Nunito , sans-serif !important',
            color: 'black',
          }}
        >
          {messages[ranks[activeStep]]}
        </Typography>
        <Typography variant='overline' sx={{
          textTransform: 'lowercase',
          lineHeight: 0.9,
          fontWeight: 400,
          fontSize: '0.75rem',
          color: '#827ABD',
        }}>
          <b>   {activeStep === 6 ? rankList[activeStep + 2]?.point - currentScore :
            rankList[activeStep + 1]?.point - currentScore} </b> {messages.to} {' '}
          <p
            style={{
              display: 'inline',
              color: '#827ABD',
              fontWeight: 600,
              textTransform: 'capitalize'
            }}
          >
            {
              messages[ranks[activeStep + 1]]
            }
          </p>
        </Typography>

      </Stack>

      <CountdownTimer
        gameStart={gameStart}
        gameOver={gameOver}
        currentScore={currentScore}
      />

      <Box sx={{
        width: 'calc(100% - 260px)',
        position: 'absolute',
        right: 13,
        '& b': {
          position: 'absolute',
          width: '92%',
          height: 2,
          backgroundColor: '#D8DEE9',
          top: 12,
          left: 20,
          zIndex: 1,
        }
      }}>
        <b />
        <Stepper activeStep={activeStep} alternativeLabel
          sx={{
            '& .css-zpcwqm-MuiStepConnector-root': {
              width: '100%'
            },
            '& .MuiStepLabel-iconContainer': {
              zIndex: 5,
            },
            '& .MuiStepConnector-line': {
              display: 'none',
            },
            '& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
              width: 29,
              height: 29,
            },
          }}
        >
          {
            [
              ...Array(7).fill(currentScore),
              , maxPoint].map((v, i) => (
                <Step key={i}
                  sx={{
                    '& .MuiStepIcon-root': {
                      color: '#D8DEE9 !important',
                      '&.Mui-completed': {
                        color: 'lightgreen !important',
                        backgroundColor: 'white !important',
                      },
                      '&.Mui-active': {
                        color: 'lightgreen !important',
                      },
                    },
                    '& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root': {
                      width: i === 8 ? 30 : 11.5,
                      height: i === 8 ? 30 : 11.5,
                      marginTop: activeStep === i || i === 8 ? -0.2 : 0.8,
                    },
                    '& svg text ': {
                      fontSize: '1rem !important',
                      display: 'none',
                    },

                    '& .MuiStepLabel-label': {
                      position: 'absolute',
                      top: -13,
                      left: i === 8 ? 14 : (i === 0 ? 15 : 13),
                      zIndex: 6,
                      display: activeStep === i || i === 8 ? 'block' : 'none',
                      color: 'white !important',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    },

                  }}
                >

                  <StepLabel>{v === 0 ? '0 ' : v}</StepLabel>

                </Step>
              ))
          }
        </Stepper>
      </Box>
    </Container>
  )
}


