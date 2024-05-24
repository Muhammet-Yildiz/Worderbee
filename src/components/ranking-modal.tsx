import { Typography, Fade, Modal, Box, Backdrop, alpha, } from '@mui/material';
import { useState } from 'react';
import { RankingIcon } from '@/icons/ranking';
import { nunito, tiltWarp } from '@/lib/fonts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    height: 440,
    bgcolor: 'white',
};


const ranks = ['beginner','novice','okay ','good ','solid ','great','advanced','expert','master']

export function RankingModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (

        <div>   
            <RankingIcon onClick={handleOpen} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
             
            >
                <Fade in={open}>
                    <Box sx={{
                        ...style,
                        borderRadius: '0.6rem !important',
                        outline: 'none !important',
                     backgroundColor: (theme) => theme.palette.background.default,
                    }}>

                        <Typography id="transition-modal-title" 
                            sx={{
                                fontSize: '1.15rem',
                                textAlign: 'center',
                                backgroundColor:  (theme) => theme.palette.background.paper,
                                py: 1.6,
                                borderRadius: '0.8rem  0.8rem 0 0',
                                mb: 2,
                                color:  (theme) => theme.palette.text.primary,
                            }}
                            className={tiltWarp.className}
                        >
                            Rankings
                        </Typography>

                        <Typography id="transition-modal-title" component="h6"
                            sx={{
                                fontSize: '0.84rem',
                                px: 2.5,
                                borderRadius: '0.8rem  0.8rem 0 0',
                                mb: 2,
                                color:  (theme) =>  alpha(theme.palette.text.primary, 0.8),
                                lineHeight: 1.8,
                            }}
                        >
                        Ranks are based on a percentage of possible points in a puzzle. The minimum scores to reach each rank for today’s are:
                        </Typography>

                        {ranks.map((rank, index) => (
                            <Typography key={index} id="transition-modal-description" sx={{
                                fontSize: '0.85rem',
                                py: 0.5,
                                pl: 2.5,
                                pr: 1.8,
                                '& b': {
                                    fontSize: '0.7rem',
                                    mr: 0.6,
                                 
                                },
                                textTransform: 'capitalize',
                                fontWeight: 600,
                                fontFamily :'Nunito Sans, sans-serif',
                                color:  (theme) => alpha(theme.palette.text.primary, 0.9),
                            }}>
                                <b> 🎯  </b>
                                {rank}
                            </Typography>
                        ))
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}