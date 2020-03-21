const importAllImages = (r) => {
    return r.keys().map(r);
}

const allImages = importAllImages(require.context('./img/', false, /\.(png|jpe?g|svg)$/));

export const hiddenImgs = [
    allImages[0],
    allImages[0],
    allImages[2],
    allImages[2],
    allImages[3],
    allImages[3],
    allImages[4],
    allImages[4],
    allImages[5],
    allImages[5],
    allImages[6],
    allImages[6],
    allImages[7],
    allImages[7],
    allImages[8],
    allImages[8],
];

export const defaultImg = allImages[1];
