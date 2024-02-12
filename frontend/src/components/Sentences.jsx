import { Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { Sentence } from "./Sentence";

export const Sentences = ({ story, isLoading }) => {
    return (
        <Box maxHeight={'55vh'} padding={2} height={'55vh'} width={'100%'} maxWidth={'900px'} margin={'0 auto'} sx={{ background: 'rgb(7, 19, 24)', overflowY: 'auto', borderRadius: '4px' }}>
            {story.sentences && story.sentences.map(sentence => <Sentence key={sentence._id} content={sentence.content} />)}
            {isLoading && Array(10).fill().map((_, i) => <p key={i}><Skeleton width={`${Math.floor(Math.random() * 100)}%`} animation="wave" /></p>)}
        </Box>
    )
}
