import { useAuthContext } from "../contexts";

export const Sentence = ({ sentence, isLastSentence, storyStatus }) => {

  const { user } = useAuthContext();

  const disabledSentence = ((sentence.createdFrom._id !== user._id) && !isLastSentence && storyStatus !== 'completed');

  return (
    <p style={{ filter: `blur(${disabledSentence ? '4px' : '0'})`, pointerEvents: disabledSentence ? 'none' : 'all', userSelect: disabledSentence ? 'none' : '' }}>{sentence.content}</p>
  )
}
