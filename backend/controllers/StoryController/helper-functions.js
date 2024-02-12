import { LOREM_IPSUM_SENTENCES } from "../../constants/index.js"

export const getRandomSentence = () => {

    const random = Math.floor(Math.random() * LOREM_IPSUM_SENTENCES.length);
    return LOREM_IPSUM_SENTENCES[random];

}
