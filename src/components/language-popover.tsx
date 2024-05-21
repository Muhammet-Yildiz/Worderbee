import { useRef, useState } from 'react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@mui/material';
import { UKFlagIcon } from '@/icons/uk_flag';
import { TRFlagIcon } from '@/icons/tr_flag';

const languageOptions : 
{
  [key: string]: {
    icon:  any;
    label: string;
  };
}
= {
  en: {
    icon:  <UKFlagIcon/>,
    label: 'English'
  },
  tr: {
    icon:  <TRFlagIcon/>,
    label: 'Türkish'
  }
  
};

export const LanguagePopover = ( { language} : { language: string } ) => {

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const selectedOption = languageOptions[language as string];

  return (
    <>
    
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.52rem',
            fontSize: '0.9rem',
            '& svg': {
              width: '1.4rem',
              height: '1.4rem',
            },
            backgroundColor: '#E4EAF3',
            p: '0.52rem 0.62rem',
            cursor: 'pointer',
            transition: '0.3s all',
            borderRadius: '0.4rem',
            fontWeight:'bold',
          }}
          onClick={handleOpen}
          ref={anchorRef}
        >
         
            {selectedOption.icon}
            
            { language === 'en' ? 'EN' : 'TR' }
        </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        
        {Object.keys(languageOptions).map((option) => (
          <MenuItem
            component="a"
            onClick={() =>{
              if(option === language) return;

              window.open(`/${option}`,'_blank')
              handleClose();
            }}
            key={option}
          >
            <ListItemIcon>
              <Box
                sx={{
                  display: 'flex',
                  height: 20,
                  width: 20,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                
                {languageOptions[option].icon}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {languageOptions[option].label}
                </Typography>
              )}
            />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};