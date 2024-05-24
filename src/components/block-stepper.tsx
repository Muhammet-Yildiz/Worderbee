import React, { useEffect } from 'react'
import { alpha, Box, Container, Stack, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
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
            color: (theme) => theme.palette.text.primary,
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
          <Box component='p'
            sx={{
              display: 'inline',
              color:   (theme) => theme.palette.primary.main,
              fontWeight: 600,
              textTransform: 'capitalize'
            }}
          >
            {
              messages[ranks[activeStep + 1]]
            }
          </Box>
        </Typography>

      </Stack>

      <CountdownTimer
        gameStart={gameStart}
        gameOver={gameOver}
        currentScore={currentScore}
      />

      <Box sx={{
        width: {
          xs : 'calc(100% - 225px)',
          sm:'calc(100% - 260px)',
        },
        position: 'absolute',
        right: 13,
        '& b': {
          position: 'absolute',
          width: '91%',
          height: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
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
                      width:  i === 8 ? 38 : 11,
                      height:  i === 8 ? 38 : 11,
                      marginTop: activeStep === i || i === 8 ? -0.5 : 0.9,
                      color:  (theme) => theme.palette.background.paper,
                      '&.Mui-completed': {
                        color:  (theme) => alpha(theme.palette.primary.main,0.4) + ' !important',
                        backgroundColor:  (theme) => theme.palette.background.default,
                        width: 16,
                        height: 16,
                        marginTop: 0.6,
                      },
                      '&.Mui-active': {
                        color:  (theme) => alpha(theme.palette.primary.main,0.4) + ' !important',
                        width: 36,
                        height: 36,
                      },
                    },
                   
                    '& svg text ': {
                      display: 'none !important'
                    },

                    '& .MuiStepLabel-label': {
                      position: 'absolute',
                      top: -13,
                      left: i === 8 ? 14 : (i === 0 ? 15 : 13),
                      zIndex: 6,
                      display: activeStep === i || i === 8 ? 'block' : 'none',
                      color: (theme) => {
                        return i === 8 ? 
                        alpha(theme.palette.text.primary,0.7)
                        : alpha(theme.palette.text.primary,0.6)
                      },
                      fontWeight: 'bold',
                      fontSize: '0.94rem',
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


