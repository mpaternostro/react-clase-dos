import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FancyButton from '../small/FancyButton';
import createTilesArray from '../../array-functions';
import { getActiveTile, onTileHit, onTileMiss } from '../../tile-functions';

const GameStatus = ({className, tries, elapsedTime}) => {
    return (
        <div className={className}>
            <span className='status'>Tries: {tries}</span>
            <span className='status'>Elapsed Time: {elapsedTime} seconds</span>
        </div>
    );
};
GameStatus.propTypes = {
    className: PropTypes.string,
    tries: PropTypes.number,
    elapsedTime: PropTypes.number,
};

const StyledGameStatus = styled(GameStatus)`
    display: flex;
    width: 55vw;
    justify-content: space-between;
    align-items: center;
    .status {
        margin: 5px;
    }
`;

const Card = ({className, value, onClick = () => {} }) => {
    return (
        <button disabled={value.grayedOut && true} onClick={onClick} className={className}>
            <img src={value.defaultImg} draggable='false' alt='default' className={'card'}/>
        </button>
    );
};
Card.propTypes = {
    className: PropTypes.string,
    value: PropTypes.object,
    onClick: PropTypes.func,
};

const StyledCard = styled(Card)`
    background: #F0F0F3;
    margin: 10px;
    border-radius: 5px;
    box-shadow: -5px -4px 13px 0px rgba(255, 255, 255, 0.48), inset -7px -11px 13px 5px rgb(210, 210, 210, 1);    
    .card {
        opacity: ${props => props.value.grayedOut ? 0.3 : 1};
        transition: opacity 0.5s;
        width: 14vw;
        height: 14vh;
    }
`;

const WinnerModal = ({className, show, tries, elapsedTime, restart = () => {} }) => {
    return (
        <div className={className}>
            <span className='winner-modal-text'>
                You have won the game, it took you {tries} tries and {show && elapsedTime} seconds.
            </span>
            <FancyButton onClick={restart}>Play again?</FancyButton>
        </div>
    );
};
WinnerModal.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    tries: PropTypes.number,
    elapsedTime: PropTypes.number,
    restart: PropTypes.func,
};

const StyledWinnerModal = styled(WinnerModal)`
    opacity: ${props => props.show ? 1 : 0};
    transform: translateY(${props => props.show ? -50 : 0}vh);
    transition: opacity 0.2s, transform 0.3s;
    .winner-modal-text {
        margin-bottom: 10px;
        padding: 15px 32px;
        border: 1px solid black;
        color: black;
        background-color: #507c36;      
    }
`;

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

const useMemoTestGameState = () => {
    const [tiles, setTiles] = useState(createTilesArray);
    const [tries, setTries] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const ONE_SECOND = 1000;
    const [blockUserInput, setBlockUserInput] = useState(false);
    const gameEnded = tiles.every(tile => tile.grayedOut === true);

    useInterval(() => setSeconds(seconds + 1), ONE_SECOND);
    const setTileTo = (selectedTile) => {
        if (!gameEnded && !selectedTile.active && !selectedTile.grayedOut && !blockUserInput){
            setTiles(getActiveTile(selectedTile.index, tiles));
            const activeTiles = tiles.filter(tile => tile.active === true);
            if (activeTiles.length !== 2) {
                return;
            }
            setTries(tries => tries + 1);
            if (activeTiles[0].defaultImg === activeTiles[1].defaultImg) {
                return onTileHit(activeTiles, tiles, setTiles, setBlockUserInput);
            }
            return onTileMiss(tiles, setTiles, setBlockUserInput);
        }
    };
    const restart = () => {
        setTiles(createTilesArray);
        setTries(0);
        setSeconds(0);
    };
    return { tiles, tries, setTileTo, gameEnded, restart, seconds };
};

const MemoTest = () => {
    const { tiles, tries, setTileTo, gameEnded, restart, seconds } = useMemoTestGameState();
    return (
      <>
        <StyledGameStatus tries={tries} elapsedTime={seconds}/>
        <div className='memo-test-row'>
            <StyledCard value={tiles[0]} onClick={() => setTileTo(tiles[0])}/>
            <StyledCard value={tiles[1]} onClick={() => setTileTo(tiles[1])}/>
            <StyledCard value={tiles[2]} onClick={() => setTileTo(tiles[2])}/>
            <StyledCard value={tiles[3]} onClick={() => setTileTo(tiles[3])}/>
        </div>
        <div className='memo-test-row'>
            <StyledCard value={tiles[4]} onClick={() => setTileTo(tiles[4])}/>
            <StyledCard value={tiles[5]} onClick={() => setTileTo(tiles[5])}/>
            <StyledCard value={tiles[6]} onClick={() => setTileTo(tiles[6])}/>
            <StyledCard value={tiles[7]} onClick={() => setTileTo(tiles[7])}/>
        </div>
        <div className='memo-test-row'>
            <StyledCard value={tiles[8]} onClick={() => setTileTo(tiles[8])}/>
            <StyledCard value={tiles[9]} onClick={() => setTileTo(tiles[9])}/>
            <StyledCard value={tiles[10]} onClick={() => setTileTo(tiles[10])}/>
            <StyledCard value={tiles[11]} onClick={() => setTileTo(tiles[11])}/>
        </div>
        <div className='memo-test-row'>
            <StyledCard value={tiles[12]} onClick={() => setTileTo(tiles[12])}/>
            <StyledCard value={tiles[13]} onClick={() => setTileTo(tiles[13])}/>
            <StyledCard value={tiles[14]} onClick={() => setTileTo(tiles[14])}/>
            <StyledCard value={tiles[15]} onClick={() => setTileTo(tiles[15])}/>
        </div>
        <FancyButton onClick={restart}>Restart</FancyButton>
        <StyledWinnerModal show={gameEnded} tries={tries} elapsedTime={seconds} restart={() => restart()}/>
      </>
    );
};
MemoTest.propTypes = {
    tiles: PropTypes.array,
    tries: PropTypes.number,
    setTileTo: PropTypes.func,
    gameEnded: PropTypes.bool,
    restart: PropTypes.func,
    seconds: PropTypes.number,
}
export default MemoTest;
