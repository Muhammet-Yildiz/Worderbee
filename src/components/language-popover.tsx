import { useRef, useState } from 'react';
import {
  alpha,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  Typography
} from '@mui/material';
import { UKFlagIcon } from '@/icons/uk_flag';
import { TRFlagIcon } from '@/icons/tr_flag';
import { montserrat, nunito, tiltWarp } from '@/lib/fonts';
import { CloseIcon } from '@/icons/close';
import { useSettings } from '@/contexts/settings-context';

const languageOptions:
  {
    [key: string]: {
      icon: any;
      label: string;
    };
  }
  = {
  en: {
    icon: <UKFlagIcon />,
    label: 'English'
  },
  tr: {
    icon: <TRFlagIcon />,
    label: 'Türkçe'
  }

};

export const LanguagePopover = ({ language ,messages}: { language: string ,messages:any }) => {
  const {settings} = useSettings()
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
          backgroundColor: settings?.theme === 'dark' ? 
          (theme) => 
              alpha(theme.palette.background.default, 1) + ' !important'  :   '#E4EAF3',
          p: '0.52rem 0.62rem',
          cursor: 'pointer !important',
          transition: '0.3s all',
          borderRadius: '0.4rem',
          fontWeight: '500',
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.6),
            color: '#fff',
            '& p': {
              color:  (theme) => alpha(theme.palette.primary.main, 1),
            }
          }
        }}
        onClick={handleOpen}
        ref={anchorRef}
      >
        {selectedOption.icon}
        <Typography
          className={tiltWarp.className}
          sx={{
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4c4c4c',
            transition: '0.3s all',
          }}
        >

          {language === 'en' ? 'EN' : 'TR'}
        </Typography>

      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}

        transformOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: 580,
            height: 625,
            boxShadow: 'none',
            backgroundImage :'none',
            backgroundColor:  (theme) => theme.palette.background.default
          }
        }}

        sx={{
          top: 12,
          left: {
            xs:0,
            sm:-45
          }
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            textAlign: 'center',
            backgroundColor:  (theme) =>theme.palette.background.paper,
            position: 'relative',
            color:  (theme) => theme.palette.text.primary,
            p: 1.1,
            mt: 2,
            fontWeight: '700',
            mx: 2,
            borderRadius: '0.4rem',
            ' & svg': {
             position :'absolute',
             right:10,
             bottom:12,
             fontSize: '1rem',
             fill: '#7c7d80',
             cursor: 'pointer',
            },
          }}
          className={montserrat.className}
        >
          <CloseIcon 
          onClick={handleClose}
          />
          {
            messages.title
          }
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.52rem',
            p: 2,
            textAlign: 'center',
            '& b ,& span': {
              fontFamily: 'Montserrat , sans-serif !important',
              fontSize: '1.2rem',
              color:  (theme) => theme.palette.text.primary,
            },
            '& span': {
              color:  (theme) =>  alpha(theme.palette.text.primary, 0.8),
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              pt:0.7
            }

          }}
        >
          <b>
             {messages.text}
          </b>
          <span>
            {messages.subText}
          </span>

        </Box>


        <Stack direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="center"
        spacing={  { xs: 2, sm: 5} } sx={{ p: 2,mt:2 }}>
          {Object.keys(languageOptions).map((option) => (
            <Box
              key={option}
              sx={{
                display: 'flex',
                gap: '0.52rem',
                p:  '0.8rem 1.8rem',
                cursor: 'pointer',
                backgroundColor:  option === language ? 
                (theme) => alpha(theme.palette.primary.main, 0.5) : '#E4EAF3',
                color: option === language ? '#fff' : '#2E3239',
                fontWeight: option === language ? '700' : '500',
                borderRadius: '0.4rem',
                '& svg': {
                  width: '1.4rem',
                  height: '1.4rem',
                  mr:0.6
                },
                transition: '0.3s all',
                '&:hover': {
                  backgroundColor:  (theme) => alpha(theme.palette.primary.main, 0.5),
                  color: '#fff',
                }

              }}
              onClick={() => {
                if (option === language) return;

                window.open(`/${option}`, '_blank')
                handleClose();
              }}
            >
              {languageOptions[option].icon}
              {languageOptions[option].label}
            </Box>
          ))}


        </Stack>

      </Popover>
    </>
  );
};