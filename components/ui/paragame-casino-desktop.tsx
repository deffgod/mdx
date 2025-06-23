"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, QrCode, Grid3X3, Calendar, Play, Settings, History, BookOpen, Activity, Zap, Globe, Link, TrendingUp, Target, Layers, Shuffle, Dices, Gamepad2, BarChart3, Clock, Users, Award, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

interface GameSession {
  id: string;
  gameType: string;
  startTime: number;
  bet: number;
  result?: number;
  multiplier?: number;
  profit?: number;
  status: 'active' | 'completed';
}

interface GameState {
  balance: number;
  activeSessions: GameSession[];
  gameStats: Record<string, any>;
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'games' | 'analytics' | 'research'>('games');
  const [selectedGame, setSelectedGame] = useState<string | null>('dice');
  const [gameState, setGameState] = useState<GameState>({
    balance: 182.63,
    activeSessions: [],
    gameStats: {}
  });

  const [epochInfo] = useState({
    id: 1247,
    timeRemaining: '14h 32m',
    prizePool: 15420.75,
    participants: 1483,
    blockHeight: 3482435,
    networkState: 'UP_TO_DATE'
  });

  const games = [
    {
      id: 'dice',
      name: 'PLRNG Dice',
      description: '100-sided probability distribution research',
      icon: Dices,
      category: 'Probability',
      color: '#8B5CF6',
      rtp: '99.0%',
      houseEdge: '1.0%',
      featured: true
    },
    {
      id: 'crash',
      name: 'Crash Algorithm',
      description: 'Multiplier curve algorithmic analysis',
      icon: TrendingUp,
      category: 'Economics',
      color: '#10B981',
      rtp: '99.0%',
      houseEdge: '1.0%',
      featured: true
    },
    {
      id: 'plinko',
      name: 'Plinko Physics',
      description: 'Gravitational randomness distribution',
      icon: Target,
      category: 'Physics',
      color: '#F59E0B',
      rtp: '99.0%',
      houseEdge: '1.0%',
      featured: true
    },
    {
      id: 'mines',
      name: 'Mines Logic',
      description: 'Risk calculation and probability',
      icon: Grid3X3,
      category: 'Logic',
      color: '#EF4444',
      rtp: '99.0%',
      houseEdge: '1.0%',
      featured: false
    },
    {
      id: 'roulette',
      name: 'Roulette Wheel',
      description: 'Classical probability mechanics',
      icon: Play,
      category: 'Classic',
      color: '#8B5CF6',
      rtp: '97.3%',
      houseEdge: '2.7%',
      featured: false
    },
    {
      id: 'keno',
      name: 'Keno Numbers',
      description: 'Number theory and selection patterns',
      icon: Calendar,
      category: 'Mathematics',
      color: '#06B6D4',
      rtp: '95.0%',
      houseEdge: '5.0%',
      featured: false
    }
  ];

  const walletAddress = "PRIZM-YL3R-GVEP-B8WP-5MUJD";

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <header style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><defs><pattern id=\'grid\' width=\'10\' height=\'10\' patternUnits=\'userSpaceOnUse\'><path d=\'M 10 0 L 0 0 0 10\' fill=\'none\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'0.5\'/></pattern></defs><rect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/></svg>")',
          opacity: 0.3
        }} />

        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>ParaGame Research Casino</h1>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Experimental Gaming Protocol</div>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'games', label: 'Research Games', icon: Gamepad2 },
              { id: 'overview', label: 'Overview', icon: Grid3X3 },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'research', label: 'Research', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: activeView === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Research Balance</div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{gameState.balance.toFixed(2)} PZM</div>
            </div>
            <Copy size={16} style={{ cursor: 'pointer', opacity: 0.8 }} />
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>Epoch {epochInfo.id}</div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>{epochInfo.timeRemaining}</div>
          </div>

          <div style={{
            background: epochInfo.networkState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '600',
            color: epochInfo.networkState === 'UP_TO_DATE' ? '#10B981' : '#EF4444'
          }}>
            {epochInfo.networkState}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {activeView === 'games' && (
            <GamesWorkspace 
              key="games"
              games={games}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
              gameState={gameState}
              setGameState={setGameState}
            />
          )}
          {activeView === 'overview' && (
            <OverviewDashboard key="overview" epochInfo={epochInfo} gameState={gameState} />
          )}
          {activeView === 'analytics' && (
            <AnalyticsDashboard key="analytics" gameState={gameState} />
          )}
          {activeView === 'research' && (
            <ResearchDashboard key="research" />
          )}
        </AnimatePresence>
      </main>

      {/* Status Bar */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '12px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span>Block Height: {epochInfo.blockHeight.toLocaleString()}</span>
          <span>Active Sessions: {gameState.activeSessions.length}</span>
          <span>PLRNG: Active</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span>Participants: {epochInfo.participants.toLocaleString()}</span>
          <span>Prize Pool: {epochInfo.prizePool.toLocaleString()} PZM</span>
          <span>Research Protocol: v1.10.4.7</span>
        </div>
      </footer>
    </div>
  );
};

const GamesWorkspace: React.FC<{
  games: any[];
  selectedGame: string | null;
  setSelectedGame: (game: string | null) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
}> = ({ games, selectedGame, setSelectedGame, gameState, setGameState }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', width: '100%' }}
    >
      {/* Games Sidebar */}
      <div style={{
        width: '320px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRight: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '24px',
        overflowY: 'auto'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Research Games</h3>
        
        {/* Disclaimer */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#FCA5A5', marginBottom: '8px' }}>
            ⚠️ Research Protocol
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.4 }}>
            These are experimental research tools for studying algorithmic fairness and randomness.
            All outcomes use PLRNG for provable research purposes.
          </div>
        </div>

        {/* Games List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {games.map((game) => (
            <motion.button
              key={game.id}
              style={{
                background: selectedGame === game.id ? 
                  `linear-gradient(135deg, ${game.color}30, ${game.color}10)` : 
                  'rgba(255, 255, 255, 0.05)',
                border: selectedGame === game.id ? 
                  `1px solid ${game.color}60` : 
                  '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGame(game.id)}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: `${game.color}30`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <game.icon size={20} style={{ color: game.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{game.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>{game.description}</div>
                <div style={{ 
                  fontSize: '10px', 
                  color: game.color, 
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginTop: '4px'
                }}>
                  {game.category} • RTP {game.rtp}
                </div>
              </div>
              {selectedGame === game.id && <ChevronRight size={16} style={{ color: game.color }} />}
            </motion.button>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '16px',
          marginTop: '24px'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Session Statistics</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active</div>
              <div style={{ fontWeight: '600' }}>{gameState.activeSessions.length}</div>
            </div>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Balance</div>
              <div style={{ fontWeight: '600' }}>{gameState.balance.toFixed(2)} PZM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Interface */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {selectedGame ? (
          <GameInterface 
            gameId={selectedGame}
            games={games}
            gameState={gameState}
            setGameState={setGameState}
          />
        ) : (
          <GameSelectionPlaceholder games={games} onSelectGame={setSelectedGame} />
        )}
      </div>
    </motion.div>
  );
};

const GameInterface: React.FC<{
  gameId: string;
  games: any[];
  gameState: GameState;
  setGameState: (state: GameState) => void;
}> = ({ gameId, games, gameState, setGameState }) => {
  const game = games.find(g => g.id === gameId);
  
  if (!game) return <div>Game not found</div>;

  const renderGameContent = () => {
    switch (gameId) {
      case 'dice':
        return <DiceGameDesktop gameState={gameState} setGameState={setGameState} game={game} />;
      case 'crash':
        return <CrashGameDesktop gameState={gameState} setGameState={setGameState} game={game} />;
      case 'plinko':
        return <PlinkoGameDesktop gameState={gameState} setGameState={setGameState} game={game} />;
      case 'mines':
        return <MinesGameDesktop gameState={gameState} setGameState={setGameState} game={game} />;
      default:
        return <ComingSoonGame game={game} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}
    >
      {/* Game Header */}
      <div style={{
        background: `linear-gradient(135deg, ${game.color}20, ${game.color}10)`,
        borderRadius: '20px',
        padding: '24px',
        border: `1px solid ${game.color}30`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: `${game.color}30`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <game.icon size={32} style={{ color: game.color }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>{game.name}</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>
              {game.description}
            </p>
            <div style={{ display: 'flex', gap: '20px', fontSize: '12px' }}>
              <span>Category: <strong style={{ color: game.color }}>{game.category}</strong></span>
              <span>RTP: <strong style={{ color: '#10B981' }}>{game.rtp}</strong></span>
              <span>House Edge: <strong style={{ color: '#EF4444' }}>{game.houseEdge}</strong></span>
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>PLRNG</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#10B981' }}>ACTIVE</div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div style={{ flex: 1 }}>
        {renderGameContent()}
      </div>
    </motion.div>
  );
};

const DiceGameDesktop: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
  game: any;
}> = ({ gameState, setGameState, game }) => {
  const [rollOver, setRollOver] = useState(50.5);
  const [betAmount, setBetAmount] = useState('1.00');
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [gameHistory, setGameHistory] = useState<any[]>([]);

  const winChance = rollOver > 50 ? (100 - rollOver) : rollOver;
  const multiplier = (100 / winChance * 0.99);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const result = Math.random() * 100;
      setLastResult(result);
      setIsRolling(false);
      
      const won = rollOver > 50 ? result > rollOver : result < rollOver;
      const profit = won ? (parseFloat(betAmount) * multiplier) - parseFloat(betAmount) : -parseFloat(betAmount);
      
      setGameState({
        ...gameState,
        balance: gameState.balance + profit
      });

      setGameHistory(prev => [{
        id: Date.now(),
        result: result,
        target: rollOver,
        type: rollOver > 50 ? 'over' : 'under',
        won: won,
        bet: parseFloat(betAmount),
        profit: profit,
        multiplier: multiplier,
        timestamp: Date.now()
      }, ...prev.slice(0, 9)]);
    }, 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', height: '100%' }}>
      {/* Main Game Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Dice Result */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px' }}>
            100-Sided PLRNG Dice Result
          </div>
          <motion.div 
            style={{ 
              fontSize: '72px', 
              fontWeight: '800', 
              color: game.color,
              marginBottom: '16px'
            }}
            animate={isRolling ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
          >
            {isRolling ? '?' : lastResult ? lastResult.toFixed(2) : '00.00'}
          </motion.div>
          <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
            {lastResult && !isRolling && (
              <span style={{ 
                color: rollOver > 50 ? 
                  (lastResult > rollOver ? '#10B981' : '#EF4444') :
                  (lastResult < rollOver ? '#10B981' : '#EF4444')
              }}>
                {rollOver > 50 ? 
                  (lastResult > rollOver ? '🎉 WIN!' : '❌ Loss') :
                  (lastResult < rollOver ? '🎉 WIN!' : '❌ Loss')}
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Roll Target */}
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
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
                  height: '6px',
                  borderRadius: '3px',
                  background: `linear-gradient(90deg, ${game.color}, rgba(255,255,255,0.2))`,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>
                <span>1.00</span>
                <span>99.00</span>
              </div>
            </div>

            {/* Bet Amount */}
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Bet Amount</div>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                step="0.01"
                min="0.01"
                max={gameState.balance}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              />
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>
                Available: {gameState.balance.toFixed(2)} PZM
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '24px', marginBottom: '24px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Win Chance</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>{winChance.toFixed(1)}%</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Multiplier</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#F59E0B' }}>{multiplier.toFixed(4)}x</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Potential Win</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: game.color }}>
                {(parseFloat(betAmount) * multiplier).toFixed(2)} PZM
              </div>
            </div>
          </div>

          <button
            onClick={rollDice}
            disabled={isRolling || parseFloat(betAmount) > gameState.balance || parseFloat(betAmount) <= 0}
            style={{
              width: '100%',
              padding: '20px',
              background: (isRolling || parseFloat(betAmount) > gameState.balance || parseFloat(betAmount) <= 0) ? 
                'rgba(255, 255, 255, 0.1)' : 
                `linear-gradient(135deg, ${game.color}, ${game.color}CC)`,
              border: 'none',
              borderRadius: '16px',
              color: '#fff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: (isRolling || parseFloat(betAmount) > gameState.balance || parseFloat(betAmount) <= 0) ? 
                'not-allowed' : 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {isRolling ? 'Rolling PLRNG...' : 'Roll Dice'}
          </button>
        </div>
      </div>

      {/* Sidebar - History & Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Game History */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          flex: 1
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Recent Results</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
            {gameHistory.map((entry) => (
              <div key={entry.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                border: `1px solid ${entry.won ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
              }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{entry.result.toFixed(2)}</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {entry.type} {entry.target.toFixed(1)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontWeight: '600',
                    color: entry.won ? '#10B981' : '#EF4444'
                  }}>
                    {entry.profit > 0 ? '+' : ''}{entry.profit.toFixed(2)} PZM
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {entry.multiplier.toFixed(2)}x
                  </div>
                </div>
              </div>
            ))}
            {gameHistory.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                color: 'rgba(255, 255, 255, 0.5)', 
                padding: '20px',
                fontSize: '14px'
              }}>
                No games played yet
              </div>
            )}
          </div>
        </div>

        {/* Quick Bet Options */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Quick Bets</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            {['0.1', '1.0', '5.0', '10.0'].map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                style={{
                  padding: '8px',
                  background: betAmount === amount ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {amount} PZM
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => setBetAmount((parseFloat(betAmount) * 2).toFixed(2))}
              style={{
                padding: '8px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                color: '#10B981',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              2x
            </button>
            <button
              onClick={() => setBetAmount((parseFloat(betAmount) / 2).toFixed(2))}
              style={{
                padding: '8px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#EF4444',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              1/2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CrashGameDesktop: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
  game: any;
}> = ({ gameState, setGameState, game }) => {
  const [betAmount, setBetAmount] = useState('1.00');
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState<number | null>(null);
  const [gameHistory, setGameHistory] = useState<any[]>([]);

  const startGame = () => {
    const newCrashPoint = 1 + Math.random() * 10; // Random crash between 1x and 11x
    setIsGameActive(true);
    setCurrentMultiplier(1.00);
    setHasCashedOut(false);
    setCrashPoint(newCrashPoint);
    
    const interval = setInterval(() => {
      setCurrentMultiplier(prev => {
        const next = prev + 0.01;
        if (next >= newCrashPoint) {
          clearInterval(interval);
          setIsGameActive(false);
          if (!hasCashedOut) {
            setGameState({
              ...gameState,
              balance: gameState.balance - parseFloat(betAmount)
            });
          }
          
          setGameHistory(prevHistory => [{
            id: Date.now(),
            crashPoint: newCrashPoint,
            cashedOut: hasCashedOut,
            cashOutAt: hasCashedOut ? next : null,
            bet: parseFloat(betAmount),
            profit: hasCashedOut ? (parseFloat(betAmount) * next) - parseFloat(betAmount) : -parseFloat(betAmount),
            timestamp: Date.now()
          }, ...prevHistory.slice(0, 9)]);
          
          return next;
        }
        return next;
      });
    }, 50);
  };

  const cashOut = () => {
    if (isGameActive && !hasCashedOut) {
      setHasCashedOut(true);
      const winAmount = parseFloat(betAmount) * currentMultiplier;
      setGameState({
        ...gameState,
        balance: gameState.balance + winAmount - parseFloat(betAmount)
      });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', height: '100%' }}>
      {/* Main Game Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Crash Chart */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
            Algorithmic Multiplier Research
          </div>
          <motion.div 
            style={{ 
              fontSize: '96px', 
              fontWeight: '800', 
              color: currentMultiplier >= (crashPoint || 10) ? '#EF4444' : game.color,
              marginBottom: '20px'
            }}
            animate={isGameActive ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3, repeat: isGameActive ? Infinity : 0 }}
          >
            {currentMultiplier.toFixed(2)}x
          </motion.div>
          <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
            {!isGameActive && crashPoint && currentMultiplier >= crashPoint && (
              <span style={{ color: '#EF4444', fontSize: '18px', fontWeight: '600' }}>
                🚫 CRASHED at {crashPoint.toFixed(2)}x
              </span>
            )}
            {hasCashedOut && (
              <span style={{ color: '#10B981', fontSize: '18px', fontWeight: '600' }}>
                💰 Cashed out at {currentMultiplier.toFixed(2)}x
              </span>
            )}
            {isGameActive && !hasCashedOut && (
              <span style={{ color: game.color, fontSize: '18px', fontWeight: '600' }}>
                🚀 Flying...
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Research Bet</div>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                disabled={isGameActive}
                step="0.01"
                min="0.01"
                max={gameState.balance}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Potential Win</div>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                color: game.color,
                textAlign: 'center'
              }}>
                {isGameActive ? 
                  (parseFloat(betAmount) * currentMultiplier).toFixed(2) : 
                  parseFloat(betAmount).toFixed(2)
                } PZM
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={startGame}
              disabled={isGameActive || parseFloat(betAmount) > gameState.balance || parseFloat(betAmount) <= 0}
              style={{
                flex: 1,
                padding: '20px',
                background: (isGameActive || parseFloat(betAmount) > gameState.balance || parseFloat(betAmount) <= 0) ? 
                  'rgba(255, 255, 255, 0.1)' : 
                  `linear-gradient(135deg, ${game.color}, ${game.color}CC)`,
                border: 'none',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700',
                cursor: (isGameActive || parseFloat(betAmount) > gameState.balance || parseFloat(betAmount) <= 0) ? 
                  'not-allowed' : 'pointer'
              }}
            >
              {isGameActive ? 'Flight In Progress...' : 'Start Flight'}
            </button>
            
            <button
              onClick={cashOut}
              disabled={!isGameActive || hasCashedOut}
              style={{
                flex: 1,
                padding: '20px',
                background: (!isGameActive || hasCashedOut) ? 
                  'rgba(255, 255, 255, 0.1)' : 
                  'linear-gradient(135deg, #F59E0B, #D97706)',
                border: 'none',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700',
                cursor: (!isGameActive || hasCashedOut) ? 'not-allowed' : 'pointer'
              }}
            >
              {hasCashedOut ? 'Cashed Out' : 'Cash Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - History */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Flight History</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
          {gameHistory.map((entry) => (
            <div key={entry.id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '12px',
              border: `1px solid ${entry.profit > 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Crashed at {entry.crashPoint.toFixed(2)}x</span>
                <span style={{ 
                  color: entry.profit > 0 ? '#10B981' : '#EF4444',
                  fontWeight: '600'
                }}>
                  {entry.profit > 0 ? '+' : ''}{entry.profit.toFixed(2)} PZM
                </span>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {entry.cashedOut ? 
                  `Cashed out at ${entry.cashOutAt?.toFixed(2)}x` : 
                  'Did not cash out'
                }
              </div>
            </div>
          ))}
          {gameHistory.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255, 255, 255, 0.5)', 
              padding: '20px',
              fontSize: '14px'
            }}>
              No flights yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlinkoGameDesktop: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
  game: any;
}> = ({ gameState, setGameState, game }) => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <game.icon size={80} style={{ color: game.color, margin: '0 auto 20px' }} />
      <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Plinko Physics Research</h3>
      <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
        Advanced gravitational physics simulation coming soon to the research platform.
      </p>
      <div style={{
        background: 'rgba(245, 158, 11, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        color: '#F59E0B'
      }}>
        Development in progress - Ball drop mechanics and multiplier distribution analysis
      </div>
    </div>
  );
};

const MinesGameDesktop: React.FC<{
  gameState: GameState;
  setGameState: (state: GameState) => void;
  game: any;
}> = ({ gameState, setGameState, game }) => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <game.icon size={80} style={{ color: game.color, margin: '0 auto 20px' }} />
      <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Mines Logic Research</h3>
      <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
        Risk calculation and probability research environment coming soon.
      </p>
      <div style={{
        background: 'rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        color: '#EF4444'
      }}>
        Development in progress - Grid logic and risk assessment algorithms
      </div>
    </div>
  );
};

const ComingSoonGame: React.FC<{ game: any }> = ({ game }) => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <game.icon size={80} style={{ color: game.color, margin: '0 auto 20px' }} />
      <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{game.name}</h3>
      <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
        {game.description}
      </p>
      <div style={{
        background: `${game.color}20`,
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        color: game.color
      }}>
        Research implementation coming soon to the ParaGame Protocol
      </div>
    </div>
  );
};

const GameSelectionPlaceholder: React.FC<{
  games: any[];
  onSelectGame: (gameId: string) => void;
}> = ({ games, onSelectGame }) => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <Gamepad2 size={80} style={{ color: '#8B5CF6', margin: '0 auto 40px' }} />
      <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>Select a Research Game</h3>
      <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '40px' }}>
        Choose a game from the sidebar to begin your algorithmic fairness research
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {games.filter(g => g.featured).map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            style={{
              background: `${game.color}20`,
              border: `1px solid ${game.color}40`,
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <game.icon size={40} style={{ color: game.color, marginBottom: '12px' }} />
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{game.name}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
              {game.category}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const OverviewDashboard: React.FC<{
  epochInfo: any;
  gameState: GameState;
}> = ({ epochInfo, gameState }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '24px' }}
    >
      <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Research Overview</h2>
      <div>Overview dashboard coming soon...</div>
    </motion.div>
  );
};

const AnalyticsDashboard: React.FC<{
  gameState: GameState;
}> = ({ gameState }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '24px' }}
    >
      <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Research Analytics</h2>
      <div>Analytics dashboard coming soon...</div>
    </motion.div>
  );
};

const ResearchDashboard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '24px' }}
    >
      <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Research Documentation</h2>
      <div>Research documentation coming soon...</div>
    </motion.div>
  );
};

export default App;