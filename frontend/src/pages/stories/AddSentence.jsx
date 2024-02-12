import { useEffect, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useAuthContext, useStoryContext } from "../../contexts";
import { Link, useParams } from 'react-router-dom';
import { NewSentenceInput, Sentences } from '../../components';
import { tokens } from "../../theme";
import Alert from '@mui/material/Alert';

export const AddSentence = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [story, setStory] = useState({});
    const { getStory, isLoading } = useStoryContext();
    const { user } = useAuthContext();
    const { id } = useParams();

    useEffect(() => {
        initStory();
    }, [])

    const initStory = async () => {
        const story = await getStory(id);
        setStory(story);
    }

    const userHasWrittenLastSentence = () => {
        if(story && story?.sentences?.length > 0) {
            const lastSentence = story?.sentences?.slice(-1)[0];
            return lastSentence.createdFrom._id === user._id;
        }
    }

    return (
        <Box m="20px">
            <Header title={story.title} subtitle={`${story.topic || 'Add sentence'}`} />
            <Box display={'flex'} flexDirection={'column'} gap={3}>
                {
                    story.status === 'completed' && (
                        <Alert style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }} severity="info">The story is finished. No further additions are possible. View the complete story <Link style={{ color: colors.redAccent[400] }} to={`/stories/view/${story._id}`}>here</Link></Alert>
                    )
                }
                <Sentences story={story} isLoading={isLoading} />
                <NewSentenceInput id={story._id} completed={story.status === 'completed'} initStory={initStory} disabledInput={userHasWrittenLastSentence()} />
            </Box>
        </Box>
    );
};
