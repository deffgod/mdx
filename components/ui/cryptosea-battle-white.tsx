"use client"

import React, { useState, useEffect } from 'react';
import { AlertCircle, Anchor, Crosshair, LifeBuoy, ShieldAlert, Waves } from 'lucide-react';



// Constants
const BOARD_SIZE = 10;
const SHIPS = [
  { name: 'Carrier', size: 5, symbol: 'C' },
  { name: 'Battleship', size: 4, symbol: 'B' },
  { name: 'Cruiser', size: 3, symbol: 'R' },
  { name: 'Submarine', size: 3, symbol: 'S' },
  { name: 'Destroyer', size: 2, symbol: 'D' }
];

// Simulate connection to PRIZM blockchain
const mockPrizmConnection = {
  connected: true,
  balance: 1000,
  address: '0x123...789',
  recordMove: (x, y, result) => {
    console.log(`Move recorded on blockchain: (${x},${y}) - ${result}`);
    return { blockNumber: Math.floor(Math.random() * 10000), txHash: `0x${Math.random().toString(16).slice(2)}` };
  },
  startGame: (stake) => {
    console.log(`Game started with stake: ${stake} PZM`);
    return { gameId: `game_${Math.random().toString(16).slice(2)}`, blockNumber: Math.floor(Math.random() * 10000) };
  },
  claimReward: (gameId) => {
    console.log(`Claiming reward for game: ${gameId}`);
    return { reward: 200, txHash: `0x${Math.random().toString(16).slice(2)}` };
  }
};

const CryptoSeaBattleWhite = () => {
  // Game state
  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [computerBoard, setComputerBoard] = useState(createEmptyBoard());
  const [playerShips, setPlayerShips] = useState([]);
  const [computerShips, setComputerShips] = useState([]);
  const [currentShip, setCurrentShip] = useState(null);
  const [gamePhase, setGamePhase] = useState('setup'); // setup, playing, ended
  const [message, setMessage] = useState('Place your ships on the board');
  const [isVertical, setIsVertical] = useState(false);
  const [gameStats, setGameStats] = useState({
    playerMoves: 0,
    computerMoves: 0,
    hits: 0,
    misses: 0,
    stake: 10,
    gameId: null,
    transactions: []
  });
  const [hoveredCell, setHoveredCell] = useState(null);

  // Create empty game board
  function createEmptyBoard() {
    return Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null));
  }

  // Initialize game
  useEffect(() => {
    if (gamePhase === 'setup') {
      setCurrentShip(SHIPS[0]);
    }
  }, [gamePhase]);

  // Place computer ships when game starts
  useEffect(() => {
    if (gamePhase === 'playing' && computerShips.length === 0) {
      const { board, ships } = placeComputerShips();
      setComputerBoard(board);
      setComputerShips(ships);
    }
  }, [gamePhase]);

  // Rotate ship placement orientation
  const toggleOrientation = () => {
    setIsVertical(!isVertical);
  };

  // Place computer ships randomly
  const placeComputerShips = () => {
    const board = createEmptyBoard();
    const ships = [];
    
    SHIPS.forEach(ship => {
      let placed = false;
      while (!placed) {
        const vertical = Math.random() > 0.5;
        const x = Math.floor(Math.random() * (vertical ? BOARD_SIZE : (BOARD_SIZE - ship.size + 1)));
        const y = Math.floor(Math.random() * (vertical ? (BOARD_SIZE - ship.size + 1) : BOARD_SIZE));
        
        // Check if placement is valid
        let valid = true;
        for (let i = 0; i < ship.size; i++) {
          const checkX = vertical ? x : x + i;
          const checkY = vertical ? y + i : y;
          if (board[checkY][checkX] !== null) {
            valid = false;
            break;
          }
        }
        
        if (valid) {
          // Place ship
          const coordinates = [];
          for (let i = 0; i < ship.size; i++) {
            const shipX = vertical ? x : x + i;
            const shipY = vertical ? y + i : y;
            board[shipY][shipX] = ship.symbol;
            coordinates.push({ x: shipX, y: shipY });
          }
          ships.push({ ...ship, coordinates, sunk: false });
          placed = true;
        }
      }
    });
    
    return { board, ships };
  };

  // Handler for player clicking on their own board during setup
  const handlePlayerCellClick = (x, y) => {
    if (gamePhase !== 'setup' || !currentShip) return;
    
    // Check if ship placement is valid
    let valid = true;
    for (let i = 0; i < currentShip.size; i++) {
      const checkX = isVertical ? x : x + i;
      const checkY = isVertical ? y + i : y;
      
      if (
        checkX >= BOARD_SIZE || 
        checkY >= BOARD_SIZE || 
        playerBoard[checkY][checkX] !== null
      ) {
        valid = false;
        break;
      }
    }
    
    if (!valid) {
      setMessage('Invalid placement position!');
      return;
    }
    
    // Place ship
    const newBoard = [...playerBoard];
    const coordinates = [];
    
    for (let i = 0; i < currentShip.size; i++) {
      const shipX = isVertical ? x : x + i;
      const shipY = isVertical ? y + i : y;
      newBoard[shipY][shipX] = currentShip.symbol;
      coordinates.push({ x: shipX, y: shipY });
    }
    
    const newShip = { ...currentShip, coordinates, sunk: false };
    const newShips = [...playerShips, newShip];
    
    setPlayerBoard(newBoard);
    setPlayerShips(newShips);
    
    // Move to next ship or start game
    const currentIndex = SHIPS.findIndex(s => s.name === currentShip.name);
    if (currentIndex < SHIPS.length - 1) {
      setCurrentShip(SHIPS[currentIndex + 1]);
      setMessage(`Place your ${SHIPS[currentIndex + 1].name} (${SHIPS[currentIndex + 1].size} cells)`);
    } else {
      // All ships placed
      setCurrentShip(null);
      setMessage('All ships placed! Start the game when ready.');
    }
  };

  // Cell hover handler for ship placement
  const handleCellHover = (x, y) => {
    if (gamePhase === 'setup' && currentShip) {
      setHoveredCell({ x, y });
    }
  };

  // Render ship placement preview
  const getPlacementPreview = (x, y) => {
    if (!currentShip || gamePhase !== 'setup' || hoveredCell?.x !== x || hoveredCell?.y !== y) {
      return null;
    }

    let valid = true;
    const previewCells = [];

    for (let i = 0; i < currentShip.size; i++) {
      const checkX = isVertical ? x : x + i;
      const checkY = isVertical ? y + i : y;
      
      if (
        checkX >= BOARD_SIZE || 
        checkY >= BOARD_SIZE || 
        playerBoard[checkY][checkX] !== null
      ) {
        valid = false;
      }
      
      if (checkX < BOARD_SIZE && checkY < BOARD_SIZE) {
        previewCells.push({ x: checkX, y: checkY });
      }
    }

    return { valid, cells: previewCells };
  };

  // Handle player attacking computer's board
  const handleComputerCellClick = (x, y) => {
    if (gamePhase !== 'playing' || computerBoard[y][x] === 'hit' || computerBoard[y][x] === 'miss') {
      return;
    }
    
    const newBoard = [...computerBoard];
    let result;
    
    if (typeof newBoard[y][x] === 'string' && newBoard[y][x] !== null) {
      // Hit
      result = 'hit';
      newBoard[y][x] = 'hit';
      
      // Update ship status
      const hitShipIndex = computerShips.findIndex(ship => 
        ship.coordinates.some(coord => coord.x === x && coord.y === y)
      );
      
      if (hitShipIndex !== -1) {
        const shipHit = computerShips[hitShipIndex];
        const allHit = shipHit.coordinates.every(coord => 
          newBoard[coord.y][coord.x] === 'hit'
        );
        
        if (allHit) {
          setComputerShips(prevShips => {
            const updatedShips = [...prevShips];
            updatedShips[hitShipIndex] = { ...shipHit, sunk: true };
            return updatedShips;
          });
          setMessage(`You sunk the computer's ${shipHit.name}!`);
        } else {
          setMessage('Hit!');
        }
      }
    } else {
      // Miss
      result = 'miss';
      newBoard[y][x] = 'miss';
      setMessage('Miss!');
    }
    
    // Record move on blockchain
    const txInfo = mockPrizmConnection.recordMove(x, y, result);
    
    // Update stats
    setGameStats(prev => ({
      ...prev,
      playerMoves: prev.playerMoves + 1,
      hits: result === 'hit' ? prev.hits + 1 : prev.hits,
      misses: result === 'miss' ? prev.misses + 1 : prev.misses,
      transactions: [...prev.transactions, { 
        type: 'move', 
        x, 
        y, 
        result, 
        blockNumber: txInfo.blockNumber, 
        txHash: txInfo.txHash 
      }]
    }));
    
    setComputerBoard(newBoard);
    
    // Check if game is over
    const allSunk = computerShips.every(ship => {
      const sunk = ship.coordinates.every(coord => newBoard[coord.y][coord.x] === 'hit');
      return sunk;
    });
    
    if (allSunk) {
      endGame('player');
      return;
    }
    
    // Computer's turn
    setTimeout(() => {
      computerMove();
    }, 500);
  };

  // Computer's move
  const computerMove = () => {
    // Simple AI: randomly select an unhit cell
    let x, y;
    let validMove = false;
    
    while (!validMove) {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
      
      if (playerBoard[y][x] !== 'hit' && playerBoard[y][x] !== 'miss') {
        validMove = true;
      }
    }
    
    const newBoard = [...playerBoard];
    let result;
    
    if (typeof newBoard[y][x] === 'string' && newBoard[y][x] !== null && newBoard[y][x] !== 'hit' && newBoard[y][x] !== 'miss') {
      // Hit
      result = 'hit';
      newBoard[y][x] = 'hit';
      
      // Update ship status
      const hitShipIndex = playerShips.findIndex(ship => 
        ship.coordinates.some(coord => coord.x === x && coord.y === y)
      );
      
      if (hitShipIndex !== -1) {
        const shipHit = playerShips[hitShipIndex];
        const allHit = shipHit.coordinates.every(coord => 
          newBoard[coord.y][coord.x] === 'hit'
        );
        
        if (allHit) {
          setPlayerShips(prevShips => {
            const updatedShips = [...prevShips];
            updatedShips[hitShipIndex] = { ...shipHit, sunk: true };
            return updatedShips;
          });
          setMessage(`Computer sunk your ${shipHit.name}!`);
        } else {
          setMessage('Computer hit your ship!');
        }
      }
    } else {
      // Miss
      result = 'miss';
      newBoard[y][x] = 'miss';
      setMessage('Computer missed!');
    }
    
    // Record move on blockchain
    const txInfo = mockPrizmConnection.recordMove(x, y, result);
    
    setGameStats(prev => ({
      ...prev,
      computerMoves: prev.computerMoves + 1,
      transactions: [...prev.transactions, { 
        type: 'computer-move', 
        x, 
        y, 
        result, 
        blockNumber: txInfo.blockNumber, 
        txHash: txInfo.txHash 
      }]
    }));
    
    setPlayerBoard(newBoard);
    
    // Check if game is over
    const allSunk = playerShips.every(ship => {
      const sunk = ship.coordinates.every(coord => newBoard[coord.y][coord.x] === 'hit');
      return sunk;
    });
    
    if (allSunk) {
      endGame('computer');
    }
  };

  // Start the game
  const startGame = () => {
    if (playerShips.length < SHIPS.length) {
      setMessage('Please place all ships before starting!');
      return;
    }
    
    // Record game start on blockchain
    const gameInfo = mockPrizmConnection.startGame(gameStats.stake);
    
    setGamePhase('playing');
    setMessage('Game started! Click on the computer\'s board to attack.');
    setGameStats(prev => ({
      ...prev,
      gameId: gameInfo.gameId,
      transactions: [...prev.transactions, {
        type: 'game-start',
        stake: prev.stake,
        gameId: gameInfo.gameId,
        blockNumber: gameInfo.blockNumber
      }]
    }));
  };

  // End the game
  const endGame = (winner) => {
    setGamePhase('ended');
    
    if (winner === 'player') {
      // Claim reward from blockchain
      const rewardInfo = mockPrizmConnection.claimReward(gameStats.gameId);
      
      setGameStats(prev => ({
        ...prev,
        transactions: [...prev.transactions, {
          type: 'reward-claim',
          gameId: prev.gameId,
          reward: rewardInfo.reward,
          txHash: rewardInfo.txHash
        }]
      }));
      
      setMessage(`Congratulations! You won and earned ${rewardInfo.reward} PZM tokens!`);
    } else {
      setMessage('Game over! The computer won this time.');
    }
  };

  // Reset the game
  const resetGame = () => {
    setPlayerBoard(createEmptyBoard());
    setComputerBoard(createEmptyBoard());
    setPlayerShips([]);
    setComputerShips([]);
    setCurrentShip(SHIPS[0]);
    setGamePhase('setup');
    setMessage('Place your ships on the board');
    setIsVertical(false);
    setGameStats({
      playerMoves: 0,
      computerMoves: 0,
      hits: 0,
      misses: 0,
      stake: 10,
      gameId: null,
      transactions: []
    });
  };

  // Handle stake amount change
  const handleStakeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setGameStats(prev => ({ ...prev, stake: value }));
    }
  };

  // Render cell content based on state
  const renderCellContent = (board, x, y) => {
    const cell = board[y][x];
    
    if (cell === 'hit') {
      return <ShieldAlert className="text-red-600" size={20} />;
    } else if (cell === 'miss') {
      return <Waves className="text-blue-400" size={20} />;
    } else if (board === playerBoard && cell !== null) {
      return <Anchor className="text-gray-600" size={20} />;
    }
    
    return null;
  };

  // Render ship placement preview
  const renderPreview = (x, y) => {
    const preview = getPlacementPreview(x, y);
    if (!preview) return null;
    
    const { valid, cells } = preview;
    const isInPreview = cells.some(cell => cell.x === x && cell.y === y);
    
    if (isInPreview) {
      return (
        <div className={`absolute inset-0 flex items-center justify-center opacity-60 ${valid ? 'bg-green-200' : 'bg-red-200'}`}>
          {valid ? <Anchor size={20} /> : <AlertCircle size={20} />}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 bg-blue-800 text-white rounded-lg p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">CryptoSea Battle</h1>
            <p className="opacity-80">Blockchain-based Sea Battle game on ParaGame Protocol</p>
          </div>
          
          <div className="text-right">
            <div className="mb-1">PRIZM Wallet: {mockPrizmConnection.address}</div>
            <div className="font-bold text-xl">Balance: {mockPrizmConnection.balance} PZM</div>
          </div>
        </div>

        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">{message}</h2>
            
            {gamePhase === 'setup' && playerShips.length === SHIPS.length && (
              <div className="flex gap-4 items-center">
                <div>
                  <label className="mr-2">Stake (PZM):</label>
                  <input 
                    type="number" 
                    value={gameStats.stake} 
                    onChange={handleStakeChange}
                    className="w-20 p-2 border rounded"
                    min="1"
                  />
                </div>
                <button 
                  onClick={startGame}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Start Game
                </button>
              </div>
            )}
            
            {gamePhase === 'setup' && currentShip && (
              <div className="flex gap-4 items-center">
                <div>
                  <span className="font-bold mr-2">Placing:</span> 
                  {currentShip.name} ({currentShip.size} cells)
                </div>
                <button 
                  onClick={toggleOrientation}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isVertical ? 'Horizontal' : 'Vertical'}
                </button>
              </div>
            )}
            
            {gamePhase === 'ended' && (
              <button 
                onClick={resetGame}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Play Again
              </button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div>
              <h3 className="text-center mb-2 font-bold">Your Fleet</h3>
              <div className="grid grid-cols-11 gap-px bg-gray-300 border border-gray-400 rounded overflow-hidden">
                {/* Column labels */}
                <div className="bg-gray-200 flex items-center justify-center h-8"></div>
                {Array(BOARD_SIZE).fill().map((_, i) => (
                  <div key={i} className="bg-gray-200 flex items-center justify-center h-8 font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                
                {/* Rows with labels */}
                {Array(BOARD_SIZE).fill().map((_, y) => (
                  <React.Fragment key={y}>
                    <div className="bg-gray-200 flex items-center justify-center w-8 font-bold">
                      {y + 1}
                    </div>
                    {Array(BOARD_SIZE).fill().map((_, x) => (
                      <div 
                        key={`${x}-${y}`} 
                        className={`
                          w-8 h-8 flex items-center justify-center relative 
                          ${playerBoard[y][x] === 'hit' ? 'bg-red-100' : 
                            playerBoard[y][x] === 'miss' ? 'bg-blue-100' : 
                            playerBoard[y][x] !== null ? 'bg-gray-100' : 'bg-white'}
                          ${gamePhase === 'setup' ? 'cursor-pointer hover:bg-gray-100' : ''}
                        `}
                        onClick={() => handlePlayerCellClick(x, y)}
                        onMouseEnter={() => handleCellHover(x, y)}
                      >
                        {renderCellContent(playerBoard, x, y)}
                        {renderPreview(x, y)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              
              {gamePhase !== 'setup' && (
                <div className="mt-4">
                  <h4 className="font-bold mb-1">Your Ships:</h4>
                  <div className="space-y-1">
                    {playerShips.map((ship, idx) => (
                      <div key={idx} className="flex items-center">
                        {ship.sunk ? 
                          <ShieldAlert className="text-red-600 mr-2" size={16} /> : 
                          <Anchor className="text-gray-600 mr-2" size={16} />
                        }
                        <span className={ship.sunk ? 'line-through text-red-600' : ''}>
                          {ship.name} ({ship.size})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-center mb-2 font-bold">Enemy Waters</h3>
              <div className={`grid grid-cols-11 gap-px bg-gray-300 border border-gray-400 rounded overflow-hidden ${gamePhase !== 'playing' ? 'opacity-50' : ''}`}>
                {/* Column labels */}
                <div className="bg-gray-200 flex items-center justify-center h-8"></div>
                {Array(BOARD_SIZE).fill().map((_, i) => (
                  <div key={i} className="bg-gray-200 flex items-center justify-center h-8 font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                
                {/* Rows with labels */}
                {Array(BOARD_SIZE).fill().map((_, y) => (
                  <React.Fragment key={y}>
                    <div className="bg-gray-200 flex items-center justify-center w-8 font-bold">
                      {y + 1}
                    </div>
                    {Array(BOARD_SIZE).fill().map((_, x) => (
                      <div 
                        key={`${x}-${y}`} 
                        className={`
                          w-8 h-8 flex items-center justify-center relative 
                          ${computerBoard[y][x] === 'hit' ? 'bg-red-100' : 
                            computerBoard[y][x] === 'miss' ? 'bg-blue-100' : 'bg-white'}
                          ${gamePhase === 'playing' ? 'cursor-crosshair hover:bg-gray-100' : ''}
                        `}
                        onClick={() => handleComputerCellClick(x, y)}
                      >
                        {renderCellContent(computerBoard, x, y)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              
              {gamePhase !== 'setup' && (
                <div className="mt-4">
                  <h4 className="font-bold mb-1">Enemy Ships:</h4>
                  <div className="space-y-1">
                    {computerShips.map((ship, idx) => (
                      <div key={idx} className="flex items-center">
                        {ship.sunk ? 
                          <ShieldAlert className="text-red-600 mr-2" size={16} /> : 
                          <Crosshair className="text-gray-600 mr-2" size={16} />
                        }
                        <span className={ship.sunk ? 'line-through text-red-600' : ''}>
                          {ship.name} ({ship.size})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {gamePhase !== 'setup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Game Stats</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Your Moves: {gameStats.playerMoves}</div>
                <div>Computer Moves: {gameStats.computerMoves}</div>
                <div>Hits: {gameStats.hits}</div>
                <div>Misses: {gameStats.misses}</div>
                <div>Game ID: {gameStats.gameId}</div>
                <div>Stake: {gameStats.stake} PZM</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">ParaGame Integration</h3>
              <p className="text-sm mb-2">
                This game is integrated with the PRIZM blockchain using ParaGame Protocol. 
                All moves are recorded as transactions and verified by the network.
              </p>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${mockPrizmConnection.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{mockPrizmConnection.connected ? 'Connected to PRIZM Blockchain' : 'Disconnected'}</span>
              </div>
            </div>
          </div>
        )}
        
        {gamePhase !== 'setup' && gameStats.transactions.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-bold mb-2">Blockchain Transactions</h3>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Details</th>
                  <th className="px-4 py-2 text-left">Block #</th>
                  <th className="px-4 py-2 text-left">TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {gameStats.transactions.map((tx, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-2 capitalize">{tx.type}</td>
                    <td className="px-4 py-2">
                      {tx.type === 'move' && `Player attack at (${tx.x},${tx.y}) - ${tx.result}`}
                      {tx.type === 'computer-move' && `Computer attack at (${tx.x},${tx.y}) - ${tx.result}`}
                      {tx.type === 'game-start' && `Game started with ${tx.stake} PZM stake`}
                      {tx.type === 'reward-claim' && `Claimed ${tx.reward} PZM reward`}
                    </td>
                    <td className="px-4 py-2">{tx.blockNumber || '-'}</td>
                    <td className="px-4 py-2 font-mono text-xs">{tx.txHash || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>CryptoSea Battle v1.0 - Built on ParaGame Protocol & PRIZM Blockchain</p>
          <p className="mt-1">All game moves are recorded on-chain for transparency and fairness</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoSeaBattleWhite;