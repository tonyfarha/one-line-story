import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useStoryContext } from "../contexts";

export const NewSentenceInput = ({ id, complted, initStory }) => {

  const [sentence, setSentence] = useState('');
  const { addSentence } = useStoryContext();

  const handleAddSentence = async () => {
    if (sentence.trim() === '') return;
    const res = await addSentence(id, { sentence });
    if (res) {
      initStory();
      setSentence('');
    }
  }

  return (
    <Box display={'flex'} alignItems={'center'} sx={{ overflowY: 'auto' }} padding={2} width={'100%'} maxWidth={'800px'} margin={'0 auto'}>
      <Box padding={2} width={'100%'}>
        <TextField
          fullWidth
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
          placeholder='Write your sentence here...'
          disabled={complted}
          value={sentence}
          onChange={e => setSentence(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          disabled={complted || sentence.trim() === ''}
          onClick={handleAddSentence}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}
