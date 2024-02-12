import { useAuthContext } from "../contexts";

export const Sentence = ({ sentence, isLastSentence, storyStatus }) => {

  const { user } = useAuthContext();

  const blurSentence = ((sentence.createdFrom._id !== user._id) && !isLastSentence && storyStatus !== 'completed');

  return (
    <p style={{ filter: `blur(${blurSentence ? '4px' : '0'})` }}>{sentence.content}</p>
  )
}
