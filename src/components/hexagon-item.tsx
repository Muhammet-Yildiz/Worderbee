"use client";
import React from 'react';
import { nunito } from '@/lib/fonts';
import { alpha, styled } from '@mui/material';
const Hexagon =   styled('div')(({ index } : { index: number}) => ({
    width: '80px',
    height: '48px',
    position: 'relative',
    cursor: 'pointer',
    margin: '22px 0',
    transition: '0.3s all',
    '&:before, &:after': {
        content: '""',
        position: 'absolute',
        width: 0,
        borderLeft: '40px solid transparent',
        borderRight: '40px solid transparent',
        transition: '0.3s all',
    },
   
}))

const HexagonInner =  styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '22px',
 
}))

   
type HexagonItemProps = {
    letter: string,
    index: number,
    onClick: (letter: string) => void

}

export function HexagonItem({ letter ,index ,onClick} : HexagonItemProps) {
    return (
        <Hexagon
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#E4EAF3';
                e.currentTarget.classList.remove('pressed');
            }
            }
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.8)';
                e.currentTarget.style.backgroundColor = '#d1d9e6';
                e.currentTarget.classList.add('pressed');
            }}
            index={index}
            onClick={() => onClick(letter)}
            className={nunito.className}
         sx={{
            backgroundColor:  !index ?  (theme) =>  alpha(theme.palette.primary.main, 0.7) + '!important'
            :   (theme) => theme.palette.background.paper + '!important',
            '&:before': {
                bottom: '100%',
                borderBottom: !index ? 
                (theme) => "22px solid " +alpha(theme.palette.primary.main, 0.7)  :
                (theme)  => '22px solid ' + theme.palette.background.paper
            },
            '&:after': {
                top: '100%',
                width: 0,
                borderTop: !index ?  (theme) => "22px solid " +alpha(theme.palette.primary.main, 0.7)  :    (theme)  => '22px solid ' + theme.palette.background.paper
            },
            '&.pressed:before , &.pressed:after': {
                borderBottomColor:  !index ? (theme) => alpha(theme.palette.primary.main, 0.7) :(theme) => theme.palette.background.paper + '!important',
                borderTopColor:  !index ? (theme) =>   alpha(theme.palette.primary.main, 0.7) :(theme) => theme.palette.background.paper + '!important',
            }
         }}

        >
            <HexagonInner>{letter.toUpperCase()}</HexagonInner>
        </Hexagon>
    )
}