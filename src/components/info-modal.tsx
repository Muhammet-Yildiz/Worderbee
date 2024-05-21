import { Typography, Fade, Modal, Box, Backdrop, } from '@mui/material';
import { QuestionIcon } from '@/icons/question';
import { useState } from 'react';
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

const rules = [
    'Words must have at least four letters.',
    'Words must include the center letter.',
    'Letters can be used more than once.',
    'Words with hyphens, proper nouns, vulgarities, and especially obscure words are not in the word list.',
    '4-letter words are worth 1 point each.',
    'Longer words earn 1 point per letter.',
    'Each puzzle includes at least one “pangram” which uses every letter.', 'These are worth 7 extra points!'
]

export function InfoModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (

        <div>
            <QuestionIcon onClick={handleOpen} />
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
                        borderRadius: '0.8rem !important',
                    }}>

                        <Typography id="transition-modal-title" variant="h6" component="h2"
                            sx={{
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                backgroundColor: '#F1F4F9',
                                py: 1.6,
                                borderRadius: '0.8rem  0.8rem 0 0',
                                mb: 2
                            }}
                            className={tiltWarp.className}
                        >
                            How to play?
                        </Typography>

                        {rules.slice(0, 4).map((rule, index) => (
                            <Typography key={index} id="transition-modal-description" sx={{
                                fontSize: '0.85rem',
                                py: 0.5,
                                pl: 2.5,
                                pr: 1.8,
                                '& b': {
                                    fontSize: '0.77rem',
                                    mr: 0.6
                                },
                            }}>
                                <b> ✔️  </b>
                                {rule}
                            </Typography>
                        ))
                        }

                        <Typography id="transition-modal-title" variant="h6" component="h2"
                            sx={{
                                fontSize: '1rem',
                                pt: 1.6,
                                pl: 2.5,
                                borderRadius: '0.8rem  0.8rem 0 0',
                                mb: 2
                            }}
                            className={tiltWarp.className}
                        >
                            Score points to increase your rating.
                        </Typography>

                        {rules.slice(4, 7).map((rule, index) => (
                            <Typography key={index} id="transition-modal-description" sx={{
                                fontSize: '0.85rem',
                                py: 0.5,
                                pl: 2.5,
                                pr: 1.5,
                                '& b': {
                                    fontSize: '0.77rem',
                                    mr: 0.6
                                },
                            }}>
                                <b> ✔️  </b>
                                {rule}
                            </Typography>
                        ))
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
