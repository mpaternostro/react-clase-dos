import { hiddenImgs, defaultImg } from './imgs-array';

const createTilesArray = () => {
    const shuffleArray = array => {
        const arrayCopy = [...array];
        const shuffledArray = [];
        for (let i = 0; i < array.length; i++) {
            const randomNumber = Math.floor(Math.random() * arrayCopy.length);
            shuffledArray.push(arrayCopy.splice(randomNumber, 1));
        }
        return shuffledArray.flat();
    };

    const fillArray = unorderedImages => Array.from(unorderedImages, (image, index) => {
        return {
            index: index,
            defaultImg: defaultImg,
            hiddenImg: image,
            active: false,
            grayedOut: false,
        };
    });

    const shuffledImages = shuffleArray(hiddenImgs);
    return fillArray(shuffledImages);
};

export default createTilesArray;
