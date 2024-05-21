import  { useState, useEffect, useRef } from 'react';
import { ClockIcon } from '@/icons/clock';
import { Box } from '@mui/material';

type CountdownTimerProps = {
  gameStart: boolean;
  gameOver: () => void;
  currentScore: number;
};

export const CountdownTimer = ({ gameStart, gameOver ,currentScore }: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (gameStart && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    else {
      gameOver()
      setSeconds(60)
    }
  }, [gameStart, seconds, gameOver]);

  const prevScore = useRef(null) as any

  useEffect(() => {
    if(currentScore > 0 && prevScore.current !== currentScore){
      setSeconds((prev) => prev + 15)
      prevScore.current = currentScore
    }} , [currentScore])


  return (
    <Box
      sx={{
        fontWeight: '500',
        fontSize: '1rem',
        lineHeight: 0.1,
        ml: 4,
        fontFamily: 'Nunito , sans-serif !important',
        color: 'black',
        backgroundColor: '#E4EAF3',
        width: 95,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        letterSpacing: 1.2,
        border: '2px solid #E4EAF3',
      }}
    >
      <ClockIcon
        sx={{
          width: 17,
          height: 17,
          mr: 1.2
        }}
      />

        {seconds >= 60 ?  `01:${seconds - 60 < 10 ? `0${seconds - 60}` : seconds - 60}`:`00:${seconds < 10 ? `0${seconds}` : seconds}`}
    </Box>
  );
};