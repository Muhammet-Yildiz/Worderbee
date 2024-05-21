import React from 'react'; 
import { HexagonItem } from './hexagon-item'
import { Box } from '@mui/material';

type HexagonGridProps = {
  letters: string[] ,
  setText :  React.Dispatch<React.SetStateAction<string[]>> 
}

export function HexagonGrid( { setText, letters}: HexagonGridProps) {

  const getHexagonPosition = (index: number) => {
    const positions = [
      { top: '30%', left: '35%' },
      { top: '5%', left: '49%' },
      { top: '30%', right: '10%' },
      { bottom: '14%', right: '24%' },
      { bottom: '14%', left: '21%' },
      { bottom: '39%', left: '7%' },
      { top: '5%', left: '21%' },
    ];
    return positions[index];
  };


  return (
    <Box  sx={{ width: 300, height: 300, position: 'relative'}}>
      {
        letters.map((letter :string , index :number ) => (
          <div key={index}
            style={{ position: 'absolute', ...getHexagonPosition(index) }}
          >
            <HexagonItem letter={letter} index={index} 
              onClick={  (letter) =>  setText((prev) => [...prev, letter])}  
            />
          </div>
        ))
      }
     
    </Box>
  )
}