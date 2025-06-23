"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, QrCode, Grid3X3, Calendar, Play, Settings, History, BookOpen, Activity, Zap, Globe, Link, ChevronLeft, ChevronRight, TrendingUp, Target, Layers, Shuffle, Dices, Gamepad2 } from 'lucide-react';

interface GameState {
  selectedGame: string | null;
  balance: number;
  currentBet: string;
  gameData: any;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'dashboard' | 'history' | 'research'>('games');
  const [gameState, setGameState] = useState<GameState>({
    selectedGame: null,
    balance: 182.63,
    currentBet: '1',
    gameData: {}
  });

  const [epochInfo] = useState({
    id: 1247,
    timeRemaining: '14h 32m',
    prizePool: 15420.75,
    participants: 1483
  });

  const walletAddress = "PRIZM-YL3R-GVEP-B8WP-5MUJD";

  const games = [
    {
      id: 'dice',
      name: 'PLRNG Dice',
      description: 'Research 100-sided probability distribution',
      icon: Dices,
      category: 'probability',
      color: '#8B5CF6',
      featured: true
    },
    {
      id: 'crash',
      name: 'Crash Study',
      description: 'Algorithmic multiplier research',
      icon: TrendingUp,
      category: 'economics',
      color: '#10B981',
      featured: true
    },
    {
      id: 'plinko',
      name: 'Plinko Physics',
      description: 'Gravitational randomness analysis',
      icon: Target,
      category: 'physics',
      color: '#F59E0B',
      featured: true
    },
    {
      id: 'mines',
      name: 'Mines Logic',
      description: 'Risk calculation research',
      icon: Grid3X3,
      category: 'logic',
      color: '#EF4444',
      featured: false
    },
    {
      id: 'roulette',
      name: 'Roulette Mechanics',
      description: 'Wheel probability studies',
      icon: Play,
      category: 'probability',
      color: '#8B5CF6',
      featured: false
    },
    {
      id: 'keno',
      name: 'Keno Numbers',
      description: 'Number theory research',
      icon: Calendar,
      category: 'mathematics',
      color: '#06B6D4',
      featured: false
    }
  ];

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '414px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <Header epochInfo={epochInfo} balance={gameState.balance} walletAddress={walletAddress} />
      
      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'games' && !gameState.selectedGame && (
            <GamesHub key="games-hub" games={games} onSelectGame={(gameId) => setGameState({...gameState, selectedGame: gameId})} />
          )}
          {gameState.selectedGame && (
            <GameInterface 
              key={gameState.selectedGame}
              gameId={gameState.selectedGame}
              gameState={gameState}
              setGameState={setGameState}
              onBack={() => setGameState({...gameState, selectedGame: null})}
            />
          )}
          {activeTab === 'dashboard' && (
            <Dashboard key="dashboard" epochInfo={epochInfo} />
          )}
          {activeTab === 'history' && (
            <HistoryView key="history" />
          )}
          {activeTab === 'research' && (
            <ResearchView key="research" />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {!gameState.selectedGame && (
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

const Header: React.FC<{
  epochInfo: any;
  balance: number;
  walletAddress: string;
}> = ({ epochInfo, balance, walletAddress }) => {
  return (
    <motion.header 
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><defs><pattern id=\'grid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'><path d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'0.5\'/></pattern></defs><rect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/></svg>")',
        opacity: 0.3
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>ParaGame Research</h1>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Epoch {epochInfo.id}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700' }}>{balance.toFixed(2)} PZM</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Research Balance</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{epochInfo.timeRemaining}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Time Remaining</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{epochInfo.prizePool.toLocaleString()} PZM</div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>Prize Pool</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{epochInfo.participants.toLocaleString()}</div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>Participants</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>UP_TO_DATE</div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>Network</div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const GamesHub: React.FC<{
  games: any[];
  onSelectGame: (gameId: string) => void;
}> = ({ games, onSelectGame }) => {
  const featuredGames = games.filter(game => game.featured);
  const allGames = games;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px' }}
    >
      {/* Disclaimer */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#FCA5A5', marginBottom: '8px' }}>
          ⚠️ Research Platform
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.4 }}>
          These games are experimental research tools for studying algorithmic fairness, not gambling products.
          All outcomes use PLRNG for provable randomness research.
        </div>
      </div>

      {/* Featured Games */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Featured Research</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {featuredGames.map((game) => (
            <motion.button
              key={game.id}
              style={{
                background: `linear-gradient(135deg, ${game.color}20, ${game.color}10)`,
                border: `1px solid ${game.color}40`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                width: '100%'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGame(game.id)}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: `${game.color}30`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <game.icon size={24} style={{ color: game.color }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{game.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>{game.description}</div>
                <div style={{ 
                  fontSize: '10px', 
                  color: game.color, 
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginTop: '4px'
                }}>
                  {game.category}
                </div>
              </div>
              <ChevronRight size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* All Games Grid */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>All Research Games</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {allGames.map((game) => (
            <motion.button
              key={game.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGame(game.id)}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: `${game.color}20`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <game.icon size={20} style={{ color: game.color }} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>{game.name}</div>
              <div style={{ 
                fontSize: '10px', 
                color: game.color, 
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {game.category}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Research Stats */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Research Progress</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#8B5CF6' }}>127</div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>Games Played</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>98.7%</div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>Fair Results</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#F59E0B' }}>45.2K</div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>Data Points</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GameInterface: React.FC<{
  gameId: string;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  onBack: () => void;
}> = ({ gameId, gameState, setGameState, onBack }) => {
  const renderGame = () => {
    switch (gameId) {
      case 'dice':
        return <DiceGame gameState={gameState} setGameState={setGameState} />;
      case 'crash':
        return <CrashGame gameState={gameState} setGameState={setGameState} />;
      case 'plinko':
        return <PlinkoGame gameState={gameState} setGameState={setGameState} />;
      case 'mines':
        return <MinesGame gameState={gameState} setGameState={setGameState} />;
      default:
        return <div>Game Coming Soon</div>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Game Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>Research Game</div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>PLRNG Protocol</div>
        </div>
        
        <div style={{
          background: 'rgba(139, 92, 246, 0.2)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#8B5CF6'
        }}>
          {gameState.balance.toFixed(2)} PZM
        </div>
      </div>

      {/* Game Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {renderGame()}
      </div>
    </motion.div>
  );
};

const DiceGame: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
}> = ({ gameState, setGameState }) => {
  const [rollOver, setRollOver] = useState(50.5);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);

  const winChance = rollOver > 50 ? (100 - rollOver) : rollOver;
  const multiplier = (100 / winChance * 0.99).toFixed(4);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const result = Math.random() * 100;
      setLastResult(result);
      setIsRolling(false);
      
      const won = rollOver > 50 ? result > rollOver : result < rollOver;
      if (won) {
        const winAmount = parseFloat(gameState.currentBet) * parseFloat(multiplier);
        setGameState({
          ...gameState,
          balance: gameState.balance + winAmount - parseFloat(gameState.currentBet)
        });
      } else {
        setGameState({
          ...gameState,
          balance: gameState.balance - parseFloat(gameState.currentBet)
        });
      }
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Dice Result */}
      <div style={{
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
          100-Sided PLRNG Dice
        </div>
        <motion.div 
          style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            color: '#8B5CF6',
            marginBottom: '8px'
          }}
          animate={isRolling ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
        >
          {isRolling ? '?' : lastResult ? lastResult.toFixed(2) : '00.00'}
        </motion.div>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
          {lastResult && !isRolling && (
            rollOver > 50 ? 
              (lastResult > rollOver ? '🎉 WIN!' : '❌ Loss') :
              (lastResult < rollOver ? '🎉 WIN!' : '❌ Loss')
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            Roll {rollOver > 50 ? 'Over' : 'Under'}: {rollOver.toFixed(1)}
          </div>
          <input
            type="range"
            min="1"
            max="99"
            value={rollOver}
            onChange={(e) => setRollOver(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.2)',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>
            <span>1.00</span>
            <span>99.00</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Win Chance</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#10B981' }}>{winChance.toFixed(1)}%</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Multiplier</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#F59E0B' }}>{multiplier}x</div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Bet Amount</div>
          <input
            type="number"
            value={gameState.currentBet}
            onChange={(e) => setGameState({...gameState, currentBet: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <button
          onClick={rollDice}
          disabled={isRolling || parseFloat(gameState.currentBet) > gameState.balance}
          style={{
            width: '100%',
            padding: '16px',
            background: isRolling ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isRolling ? 'not-allowed' : 'pointer'
          }}
        >
          {isRolling ? 'Rolling PLRNG...' : 'Roll Dice'}
        </button>
      </div>
    </div>
  );
};

const CrashGame: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
}> = ({ gameState, setGameState }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState<number | null>(null);

  const startGame = () => {
    setIsGameActive(true);
    setCurrentMultiplier(1.00);
    setHasCashedOut(false);
    setCrashPoint(1 + Math.random() * 10); // Random crash between 1x and 11x
    
    const interval = setInterval(() => {
      setCurrentMultiplier(prev => {
        const next = prev + 0.01;
        if (next >= (crashPoint || 10)) {
          clearInterval(interval);
          setIsGameActive(false);
          if (!hasCashedOut) {
            setGameState({
              ...gameState,
              balance: gameState.balance - parseFloat(gameState.currentBet)
            });
          }
          return next;
        }
        return next;
      });
    }, 50);
  };

  const cashOut = () => {
    if (isGameActive && !hasCashedOut) {
      setHasCashedOut(true);
      const winAmount = parseFloat(gameState.currentBet) * currentMultiplier;
      setGameState({
        ...gameState,
        balance: gameState.balance + winAmount - parseFloat(gameState.currentBet)
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Crash Chart */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.1)',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
          Algorithmic Multiplier Research
        </div>
        <motion.div 
          style={{ 
            fontSize: '56px', 
            fontWeight: '700', 
            color: currentMultiplier >= (crashPoint || 10) ? '#EF4444' : '#10B981',
            marginBottom: '8px'
          }}
          animate={isGameActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: isGameActive ? Infinity : 0 }}
        >
          {currentMultiplier.toFixed(2)}x
        </motion.div>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
          {!isGameActive && crashPoint && currentMultiplier >= crashPoint && (
            <span style={{ color: '#EF4444' }}>🚫 CRASHED at {crashPoint.toFixed(2)}x</span>
          )}
          {hasCashedOut && (
            <span style={{ color: '#10B981' }}>💰 Cashed out at {currentMultiplier.toFixed(2)}x</span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Research Bet</div>
          <input
            type="number"
            value={gameState.currentBet}
            onChange={(e) => setGameState({...gameState, currentBet: e.target.value})}
            disabled={isGameActive}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={startGame}
            disabled={isGameActive || parseFloat(gameState.currentBet) > gameState.balance}
            style={{
              flex: 1,
              padding: '16px',
              background: isGameActive ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #10B981, #059669)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isGameActive ? 'not-allowed' : 'pointer'
            }}
          >
            {isGameActive ? 'In Progress...' : 'Start Research'}
          </button>
          
          <button
            onClick={cashOut}
            disabled={!isGameActive || hasCashedOut}
            style={{
              flex: 1,
              padding: '16px',
              background: (!isGameActive || hasCashedOut) ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (!isGameActive || hasCashedOut) ? 'not-allowed' : 'pointer'
            }}
          >
            Cash Out
          </button>
        </div>
      </div>
    </div>
  );
};

const PlinkoGame: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
}> = ({ gameState, setGameState }) => {
  const [isDropping, setIsDropping] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [pins, setPins] = useState(12);

  const multipliers = [0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 5.0, 2.0, 1.0, 0.5, 0.2];

  const dropBall = () => {
    setIsDropping(true);
    setTimeout(() => {
      const resultIndex = Math.floor(Math.random() * multipliers.length);
      const multiplier = multipliers[resultIndex];
      setLastResult(multiplier);
      setIsDropping(false);
      
      const winAmount = parseFloat(gameState.currentBet) * multiplier;
      setGameState({
        ...gameState,
        balance: gameState.balance + winAmount - parseFloat(gameState.currentBet)
      });
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Plinko Board */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.1)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        minHeight: '300px'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px', textAlign: 'center' }}>
          Gravitational Physics Research
        </div>
        
        {/* Simplified Plinko Visual */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <motion.div
            style={{
              width: '20px',
              height: '20px',
              background: '#F59E0B',
              borderRadius: '50%',
              margin: '0 auto',
              marginBottom: '20px'
            }}
            animate={isDropping ? { y: [0, 200, 0] } : {}}
            transition={{ duration: 3, repeat: isDropping ? 1 : 0 }}
          />
          
          {/* Pins Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {[...Array(4)].map((_, row) => (
              <div key={row} style={{ display: 'flex', gap: '16px' }}>
                {[...Array(row + 2)].map((_, col) => (
                  <div
                    key={col}
                    style={{
                      width: '6px',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: '50%'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Multipliers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2px' }}>
          {multipliers.map((mult, index) => (
            <div
              key={index}
              style={{
                background: lastResult === mult ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                padding: '4px 2px',
                fontSize: '10px',
                fontWeight: '600',
                textAlign: 'center',
                color: mult >= 5 ? '#10B981' : mult >= 2 ? '#F59E0B' : '#EF4444',
                flex: 1
              }}
            >
              {mult}x
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Research Bet</div>
          <input
            type="number"
            value={gameState.currentBet}
            onChange={(e) => setGameState({...gameState, currentBet: e.target.value})}
            disabled={isDropping}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <button
          onClick={dropBall}
          disabled={isDropping || parseFloat(gameState.currentBet) > gameState.balance}
          style={{
            width: '100%',
            padding: '16px',
            background: isDropping ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isDropping ? 'not-allowed' : 'pointer'
          }}
        >
          {isDropping ? 'Ball Dropping...' : 'Drop Ball'}
        </button>
      </div>
    </div>
  );
};

const MinesGame: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
}> = ({ gameState, setGameState }) => {
  const [grid, setGrid] = useState<Array<'hidden' | 'gem' | 'mine'>>(Array(25).fill('hidden'));
  const [mineCount, setMineCount] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);

  const startGame = () => {
    const newGrid = Array(25).fill('hidden');
    setGrid(newGrid);
    setGameStarted(true);
    setCurrentMultiplier(1.0);
  };

  const revealTile = (index: number) => {
    if (!gameStarted || grid[index] !== 'hidden') return;
    
    const isMine = Math.random() < (mineCount / (25 - grid.filter(cell => cell !== 'hidden').length));
    const newGrid = [...grid];
    
    if (isMine) {
      newGrid[index] = 'mine';
      setGameStarted(false);
      setGameState({
        ...gameState,
        balance: gameState.balance - parseFloat(gameState.currentBet)
      });
    } else {
      newGrid[index] = 'gem';
      setCurrentMultiplier(prev => prev * 1.2);
    }
    
    setGrid(newGrid);
  };

  const cashOut = () => {
    if (gameStarted) {
      const winAmount = parseFloat(gameState.currentBet) * currentMultiplier;
      setGameState({
        ...gameState,
        balance: gameState.balance + winAmount - parseFloat(gameState.currentBet)
      });
      setGameStarted(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Mines Grid */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px', textAlign: 'center' }}>
          Risk Calculation Research • Multiplier: {currentMultiplier.toFixed(2)}x
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '8px',
          marginBottom: '16px'
        }}>
          {grid.map((cell, index) => (
            <button
              key={index}
              onClick={() => revealTile(index)}
              disabled={!gameStarted || cell !== 'hidden'}
              style={{
                aspectRatio: '1',
                background: cell === 'hidden' ? 'rgba(255, 255, 255, 0.1)' : 
                           cell === 'gem' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: gameStarted && cell === 'hidden' ? 'pointer' : 'not-allowed'
              }}
            >
              {cell === 'gem' ? '💎' : cell === 'mine' ? '💥' : '?'}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Research Bet</div>
          <input
            type="number"
            value={gameState.currentBet}
            onChange={(e) => setGameState({...gameState, currentBet: e.target.value})}
            disabled={gameStarted}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={startGame}
            disabled={gameStarted || parseFloat(gameState.currentBet) > gameState.balance}
            style={{
              flex: 1,
              padding: '16px',
              background: gameStarted ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #EF4444, #DC2626)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: gameStarted ? 'not-allowed' : 'pointer'
            }}
          >
            {gameStarted ? 'Game Active' : 'Start Game'}
          </button>
          
          <button
            onClick={cashOut}
            disabled={!gameStarted}
            style={{
              flex: 1,
              padding: '16px',
              background: !gameStarted ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #10B981, #059669)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: !gameStarted ? 'not-allowed' : 'pointer'
            }}
          >
            Cash Out
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ epochInfo: any }> = ({ epochInfo }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px' }}
    >
      <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Dashboard</div>
      <div>Coming soon...</div>
    </motion.div>
  );
};

const HistoryView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px' }}
    >
      <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>History</div>
      <div>Coming soon...</div>
    </motion.div>
  );
};

const ResearchView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px' }}
    >
      <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Research</div>
      <div>Coming soon...</div>
    </motion.div>
  );
};

const BottomNavigation: React.FC<{
  activeTab: string;
  setActiveTab: (tab: 'games' | 'dashboard' | 'history' | 'research') => void;
}> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'dashboard', icon: Grid3X3, label: 'Dashboard' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'research', icon: BookOpen, label: 'Research' }
  ];

  return (
    <nav style={{
      display: 'flex',
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px 0 25px'
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '10px',
            background: 'none',
            border: 'none',
            color: activeTab === tab.id ? '#8B5CF6' : 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab(tab.id as any)}
        >
          <tab.icon size={24} />
          <span style={{ fontSize: '12px', fontWeight: '500' }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default App;