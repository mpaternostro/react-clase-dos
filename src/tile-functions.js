import { defaultImg } from './imgs-array';

export const getActiveTile = (tileIndex, tiles) => {
    const tilesCopy = [...tiles];
    const selectedTileCopy = tilesCopy[tileIndex];
    selectedTileCopy.defaultImg = selectedTileCopy.hiddenImg;
    selectedTileCopy.active = true;
    return tilesCopy;
};

const resetActiveTiles = (tiles) => {
    const newTiles = tiles.map(tile => {
        !tile.grayedOut && (tile.defaultImg = defaultImg);
        tile.active = false;    
        return tile;
    });
    return newTiles;
};

export const onTileHit = (activeTiles, tiles, setTiles, setBlockUserInput) => {
    setBlockUserInput(true);
    activeTiles.forEach(tile => {
        tile.grayedOut = true;
    });
    setTiles(resetActiveTiles(tiles, setBlockUserInput));
    setBlockUserInput(false);
};

export const onTileMiss = (tiles, setTiles, setBlockUserInput) => {
    const showErrorDelay = 750;
    setBlockUserInput(true);
    setTimeout(() => {
        setTiles(resetActiveTiles(tiles, setBlockUserInput));
        setBlockUserInput(false);
    }, showErrorDelay);
};
