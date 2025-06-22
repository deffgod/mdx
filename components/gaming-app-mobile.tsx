
"use client"

import React, { useState, useEffect, useMemo, useCallback, useReducer, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, QrCode, Grid3X3, Calendar, Play, Settings, History, BookOpen, Activity, Zap, Globe, Link, ChevronLeft, ChevronRight, TrendingUp, Target, Layers, Shuffle, Dices, Gamepad2, RotateCcw, AlertTriangle, Volume2, VolumeX, BarChart3, TrendingDown, Clock, Award, Flame, Snowflake, RefreshCw, Maximize, Minimize, Palette } from 'lucide-react';

interface GameState {
  selectedGame: string | null;
  balance: number;
  currentBet: string;
  gameData: any;
  settings: {
    soundEnabled: boolean;
    autoPlay: boolean;
    theme: 'dark' | 'light';
    animations: boolean;
  };
  statistics: {
    gamesPlayed: number;
    totalWagered: number;
    totalWon: number;
    winStreak: number;
    lossStreak: number;
    bestMultiplier: number;
  };
}

// Game state reducer for better state management
const gameStateReducer = (state: GameState, action: any) => {
  switch (action.type) {
    case 'UPDATE_BALANCE':
      return { ...state, balance: action.payload };
    case 'UPDATE_BET':
      return { ...state, currentBet: action.payload };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'UPDATE_STATISTICS':
      return { ...state, statistics: { ...state.statistics, ...action.payload } };
    case 'UPDATE_GAME':
      return { ...state, selectedGame: action.payload };
    case 'RECORD_GAME':
      const { won, amount, multiplier } = action.payload;
      return {
        ...state,
        statistics: {
          ...state.statistics,
          gamesPlayed: state.statistics.gamesPlayed + 1,
          totalWagered: state.statistics.totalWagered + amount,
          totalWon: state.statistics.totalWon + (won ? amount * multiplier : 0),
          winStreak: won ? state.statistics.winStreak + 1 : 0,
          lossStreak: won ? 0 : state.statistics.lossStreak + 1,
          bestMultiplier: Math.max(state.statistics.bestMultiplier, multiplier || 1)
        }
      };
    default:
      return state;
  }
};

// Enhanced RouletteGame Component with new features
const RouletteGame: React.FC<{
  gameState: GameState;
  dispatch: (action: any) => void;
  onBack: () => void;
}> = memo(({ gameState, dispatch, onBack }) => {
  const [selectedChip, setSelectedChip] = useState(10);
  const [bets, setBets] = useState<Record<string, number>>({});
  const [totalBet, setTotalBet] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [hotNumbers, setHotNumbers] = useState<number[]>([]);
  const [coldNumbers, setColdNumbers] = useState<number[]>([]);
  const [lastResults, setLastResults] = useState<number[]>([]);
  const [autoBet, setAutoBet] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState(0);

  const redNumbers = useMemo(() => 
    [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36], []
  );
  const chipValues = useMemo(() => [1, 5, 10, 25, 50, 100], []);

  // Hot/Cold number calculation
  useEffect(() => {
    if (lastResults.length >= 10) {
      const counts = new Map();
      lastResults.slice(-20).forEach(num => {
        counts.set(num, (counts.get(num) || 0) + 1);
      });
      
      const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
      setHotNumbers(sorted.slice(0, 5).map(([num]) => num));
      setColdNumbers(Array.from({length: 37}, (_, i) => i).filter(num => !counts.has(num)).slice(0, 5));
    }
  }, [lastResults]);

  const getNumberColor = useCallback((num: number) => {
    if (num === 0) return 'green';
    return redNumbers.includes(num) ? 'red' : 'black';
  }, [redNumbers]);

  const placeBet = useCallback((type: string, value: string | number) => {
    if (isSpinning || gameState.balance < selectedChip) return;
    
    const key = `${type}-${value}`;
    setBets(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + selectedChip
    }));
    setTotalBet(prev => prev + selectedChip);
    dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance - selectedChip });
  }, [isSpinning, gameState.balance, selectedChip, dispatch]);

  const clearBets = useCallback(() => {
    if (isSpinning) return;
    dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance + totalBet });
    setBets({});
    setTotalBet(0);
    setResultMessage('');
  }, [isSpinning, gameState.balance, totalBet, dispatch]);

  const adjustBet = useCallback((multiplier: number) => {
    const newBet = Math.max(0.1, parseFloat(gameState.currentBet) * multiplier);
    const maxBet = Math.min(gameState.balance, 1000);
    dispatch({ type: 'UPDATE_BET', payload: Math.min(newBet, maxBet).toFixed(2) });
  }, [gameState.currentBet, gameState.balance, dispatch]);

  const spin = useCallback(() => {
    if (isSpinning || totalBet === 0) return;
    setIsSpinning(true);
    setResultMessage('');

    const result = Math.floor(Math.random() * 37);
    const spins = 5 + Math.random() * 5;
    const finalAngle = (result * (360/37)) + (spins * 360);

    setWheelRotation(finalAngle);

    setTimeout(() => {
      processResult(result);
    }, 4000);
  }, [isSpinning, totalBet]);

  const processResult = useCallback((result: number) => {
    setWinningNumber(result);
    setLastResults(prev => [...prev.slice(-19), result]);
    
    const isRed = redNumbers.includes(result);
    const isBlack = !isRed && result !== 0;
    const isEven = result !== 0 && result % 2 === 0;
    let winnings = 0;

    Object.keys(bets).forEach(betKey => {
      const [type, value] = betKey.split('-');
      const betAmount = bets[betKey];
      let payout = 0;
      
      switch(type) {
        case 'number':
          if (parseInt(value) === result) {
            payout = betAmount * 36;
          }
          break;
        case 'color':
          if ((value === 'red' && isRed) || (value === 'black' && isBlack)) {
            payout = betAmount * 2;
          }
          break;
        case 'evenodd':
          if (result !== 0 && ((value === 'even' && isEven) || (value === 'odd' && !isEven))) {
            payout = betAmount * 2;
          }
          break;
        case 'range':
          if ((value === '1-18' && result >= 1 && result <= 18) ||
              (value === '19-36' && result >= 19 && result <= 36)) {
            payout = betAmount * 2;
          }
          break;
        case 'dozen':
          const dozenStart = (parseInt(value) - 1) * 12 + 1;
          const dozenEnd = parseInt(value) * 12;
          if (result >= dozenStart && result <= dozenEnd) {
            payout = betAmount * 3;
          }
          break;
      }
      
      winnings += payout;
    });

    dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance + winnings });
    dispatch({ 
      type: 'RECORD_GAME', 
      payload: { 
        won: winnings > 0, 
        amount: totalBet, 
        multiplier: winnings / totalBet 
      } 
    });

    const netResult = winnings - totalBet;
    if (netResult > 0) {
      setResultMessage(`🎉 Won ${winnings.toFixed(2)} PZM! (+${netResult.toFixed(2)})`);
    } else if (netResult < 0) {
      setResultMessage(`💔 Lost ${totalBet.toFixed(2)} PZM`);
    } else {
      setResultMessage('🤝 Break even!');
    }

    setBets({});
    setTotalBet(0);
    setIsSpinning(false);

    // Auto-bet functionality
    if (autoBet && autoSpinCount > 0) {
      setAutoSpinCount(prev => prev - 1);
      setTimeout(() => {
        if (gameState.balance >= parseFloat(gameState.currentBet)) {
          placeBet('color', 'red');
          setTimeout(spin, 1000);
        } else {
          setAutoBet(false);
          setAutoSpinCount(0);
        }
      }, 2000);
    }
  }, [bets, gameState.balance, totalBet, redNumbers, dispatch, autoBet, autoSpinCount, placeBet, spin]);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      background: gameState.settings.theme === 'light' ? '#f8fafc' : '#000',
      color: gameState.settings.theme === 'light' ? '#1e293b' : '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '414px',
      margin: '0 auto'
    }}>
      {/* Enhanced Header with Settings */}
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>PLRNG Roulette</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Advanced Research</div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => dispatch({ 
              type: 'UPDATE_SETTINGS', 
              payload: { soundEnabled: !gameState.settings.soundEnabled } 
            })}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {gameState.settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {gameState.balance.toFixed(2)} PZM
          </div>
        </div>
      </div>

      {/* Hot/Cold Numbers Panel */}
      {lastResults.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          margin: '16px',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              🔥 Hot Numbers
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {hotNumbers.map(num => (
                <span key={num} style={{
                  background: 'rgba(239, 68, 68, 0.3)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: '600'
                }}>
                  {num}
                </span>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              ❄️ Cold Numbers
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {coldNumbers.map(num => (
                <span key={num} style={{
                  background: 'rgba(59, 130, 246, 0.3)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: '600'
                }}>
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Last Results History */}
      {lastResults.length > 0 && (
        <div style={{
          margin: '0 16px 16px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
            Recent Results
          </div>
          <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
            {lastResults.slice(-10).map((num, index) => (
              <div
                key={index}
                style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: num === 0 ? '#10B981' : getNumberColor(num) === 'red' ? '#DC2626' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: '#fff'
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Wheel with Particles */}
      <div style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
        <motion.div
          style={{
            width: '150px',
            height: '150px',
            margin: '0 auto',
            borderRadius: '50%',
            background: `conic-gradient(
              #dc3545 0deg 9.73deg, #343a40 9.73deg 19.46deg, #dc3545 19.46deg 29.19deg,
              #343a40 29.19deg 38.92deg, #dc3545 38.92deg 48.65deg, #343a40 48.65deg 58.38deg,
              #dc3545 58.38deg 68.11deg, #343a40 68.11deg 77.84deg, #dc3545 77.84deg 87.57deg,
              #343a40 87.57deg 97.3deg, #228b22 97.3deg 107.03deg, #dc3545 107.03deg 116.76deg,
              #343a40 116.76deg 126.49deg, #dc3545 126.49deg 136.22deg, #343a40 136.22deg 145.95deg,
              #dc3545 145.95deg 155.68deg, #343a40 155.68deg 165.41deg, #dc3545 165.41deg 175.14deg,
              #343a40 175.14deg 184.87deg, #dc3545 184.87deg 194.6deg, #343a40 194.6deg 204.33deg,
              #dc3545 204.33deg 214.06deg, #343a40 214.06deg 223.79deg, #dc3545 223.79deg 233.52deg,
              #343a40 233.52deg 243.25deg, #dc3545 243.25deg 252.98deg, #343a40 252.98deg 262.71deg,
              #dc3545 262.71deg 272.44deg, #343a40 272.44deg 282.17deg, #dc3545 282.17deg 291.9deg,
              #343a40 291.9deg 301.63deg, #dc3545 301.63deg 311.36deg, #343a40 311.36deg 321.09deg,
              #dc3545 321.09deg 330.82deg, #343a40 330.82deg 340.55deg, #dc3545 340.55deg 350.28deg,
              #343a40 350.28deg 360deg
            )`,
            border: '4px solid #8B5CF6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: '16px',
            boxShadow: isSpinning ? 
              '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)' :
              '0 8px 32px rgba(139, 92, 246, 0.3)'
          }}
          animate={{ rotate: wheelRotation }}
          transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            background: '#8B5CF6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '700'
          }}>
            <Target size={14} />
          </div>
        </motion.div>

        {winningNumber !== null && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              color: winningNumber === 0 ? '#10B981' : getNumberColor(winningNumber) === 'red' ? '#DC2626' : '#374151',
              background: winningNumber === 0 ? 'rgba(16, 185, 129, 0.2)' : getNumberColor(winningNumber) === 'red' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(55, 65, 81, 0.2)',
              border: `1px solid ${winningNumber === 0 ? '#10B981' : getNumberColor(winningNumber) === 'red' ? '#DC2626' : '#374151'}40`,
              display: 'inline-block'
            }}
          >
            {winningNumber}
          </motion.div>
        )}

        {resultMessage && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              marginTop: '12px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              background: resultMessage.includes('Won') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${resultMessage.includes('Won') ? '#10B981' : '#EF4444'}40`,
              color: resultMessage.includes('Won') ? '#10B981' : '#EF4444'
            }}
          >
            {resultMessage}
          </motion.div>
        )}
      </div>

      {/* Enhanced Bet Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
          Total Bet: <span style={{ color: '#8B5CF6', fontWeight: '600' }}>{totalBet.toFixed(2)} PZM</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => adjustBet(0.5)} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '4px 8px',
            color: '#fff',
            fontSize: '10px',
            cursor: 'pointer'
          }}>
            1/2
          </button>
          <button onClick={() => adjustBet(2)} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '4px 8px',
            color: '#fff',
            fontSize: '10px',
            cursor: 'pointer'
          }}>
            2x
          </button>
          <button onClick={() => dispatch({ type: 'UPDATE_BET', payload: gameState.balance.toFixed(2) })} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '4px 8px',
            color: '#fff',
            fontSize: '10px',
            cursor: 'pointer'
          }}>
            MAX
          </button>
        </div>
      </div>

      {/* Auto-bet Panel */}
      <div style={{
        margin: '0 20px 20px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '12px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Auto-Bet</span>
          <button
            onClick={() => setAutoBet(!autoBet)}
            style={{
              background: autoBet ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              color: '#fff',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            {autoBet ? 'ON' : 'OFF'}
          </button>
        </div>
        {autoBet && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              max="100"
              value={autoSpinCount}
              onChange={(e) => setAutoSpinCount(parseInt(e.target.value) || 0)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                padding: '4px 8px',
                color: '#fff',
                fontSize: '12px',
                width: '60px'
              }}
              placeholder="Spins"
            />
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>spins remaining</span>
          </div>
        )}
      </div>

      {/* Rest of the component remains the same but with enhanced styling */}
      {/* Chip Selection */}
      <div style={{ padding: '0 20px', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Select Chip Value</div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {chipValues.map(value => (
            <motion.button
              key={value}
              onClick={() => setSelectedChip(value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                minWidth: '50px',
                height: '50px',
                borderRadius: '50%',
                border: selectedChip === value ? '3px solid #8B5CF6' : '2px solid rgba(255, 255, 255, 0.2)',
                background: selectedChip === value ? 
                  'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 
                  'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: selectedChip === value ? '0 4px 20px rgba(139, 92, 246, 0.4)' : 'none'
              }}
            >
              {value}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Betting Table */}
      <div style={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
        {/* Numbers Grid */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Numbers</div>
          
          {/* Zero */}
          <motion.button
            onClick={() => placeBet('number', 0)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              color: '#10B981',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            0
            {bets['number-0'] && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: '#8B5CF6',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                {bets['number-0']}
              </motion.span>
            )}
          </motion.button>

          {/* Number Grid with enhanced animations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
            {Array.from({ length: 36 }, (_, i) => i + 1).map(num => (
              <motion.button
                key={num}
                onClick={() => placeBet('number', num)}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  aspectRatio: '1',
                  background: getNumberColor(num) === 'red' ? 
                    'rgba(220, 38, 38, 0.3)' : 'rgba(55, 65, 81, 0.3)',
                  border: `1px solid ${getNumberColor(num) === 'red' ? '#DC2626' : '#374151'}60`,
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {num}
                {bets[`number-${num}`] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: '#8B5CF6',
                      borderRadius: '50%',
                      width: '14px',
                      height: '14px',
                      fontSize: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    {bets[`number-${num}`]}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Enhanced Outside Bets */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Outside Bets</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            {[
              { type: 'color', value: 'red', label: 'RED', color: '#DC2626' },
              { type: 'color', value: 'black', label: 'BLACK', color: '#374151' }
            ].map(bet => (
              <motion.button
                key={bet.value}
                onClick={() => placeBet(bet.type, bet.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '12px',
                  background: `rgba(${bet.color === '#DC2626' ? '220, 38, 38' : '55, 65, 81'}, 0.3)`,
                  border: `1px solid ${bet.color}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {bet.label}
                {bets[`${bet.type}-${bet.value}`] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#8B5CF6',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {bets[`${bet.type}-${bet.value}`]}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Other outside bets with similar enhanced styling */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            {[
              { type: 'evenodd', value: 'even', label: 'EVEN' },
              { type: 'evenodd', value: 'odd', label: 'ODD' }
            ].map(bet => (
              <motion.button
                key={bet.value}
                onClick={() => placeBet(bet.type, bet.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {bet.label}
                {bets[`${bet.type}-${bet.value}`] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#8B5CF6',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {bets[`${bet.type}-${bet.value}`]}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            {[
              { type: 'range', value: '1-18', label: '1-18' },
              { type: 'range', value: '19-36', label: '19-36' }
            ].map(bet => (
              <motion.button
                key={bet.value}
                onClick={() => placeBet(bet.type, bet.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {bet.label}
                {bets[`${bet.type}-${bet.value}`] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#8B5CF6',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {bets[`${bet.type}-${bet.value}`]}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Dozen Bets */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { type: 'dozen', value: '1', label: '1st 12' },
              { type: 'dozen', value: '2', label: '2nd 12' },
              { type: 'dozen', value: '3', label: '3rd 12' }
            ].map(bet => (
              <motion.button
                key={bet.value}
                onClick={() => placeBet(bet.type, bet.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {bet.label}
                {bets[`${bet.type}-${bet.value}`] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#8B5CF6',
                      borderRadius: '50%',
                      width: '14px',
                      height: '14px',
                      fontSize: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {bets[`${bet.type}-${bet.value}`]}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div style={{
        padding: '20px',
        display: 'flex',
        gap: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <motion.button
          onClick={clearBets}
          disabled={isSpinning || totalBet === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1,
            padding: '16px',
            background: (isSpinning || totalBet === 0) ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${(isSpinning || totalBet === 0) ? 'rgba(255, 255, 255, 0.2)' : '#EF4444'}`,
            borderRadius: '12px',
            color: (isSpinning || totalBet === 0) ? 'rgba(255, 255, 255, 0.5)' : '#EF4444',
            fontSize: '14px',
            fontWeight: '600',
            cursor: (isSpinning || totalBet === 0) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <RotateCcw size={16} />
          Clear
        </motion.button>

        <motion.button
          onClick={spin}
          disabled={isSpinning || totalBet === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 2,
            padding: '16px',
            background: (isSpinning || totalBet === 0) ? 
              'rgba(255, 255, 255, 0.1)' : 
              'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            border: 'none',
            borderRadius: '12px',
            color: (isSpinning || totalBet === 0) ? 'rgba(255, 255, 255, 0.5)' : '#fff',
            fontSize: '16px',
            fontWeight: '700',
            cursor: (isSpinning || totalBet === 0) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: (isSpinning || totalBet === 0) ? 'none' : '0 4px 20px rgba(139, 92, 246, 0.4)'
          }}
        >
          <Play size={16} />
          {isSpinning ? 'Spinning...' : 'Spin PLRNG'}
        </motion.button>
      </div>
    </div>
  );
});

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'dashboard' | 'history' | 'research'>('games');
  
  const initialGameState: GameState = {
    selectedGame: null,
    balance: 182.63,
    currentBet: '1',
    gameData: {},
    settings: {
      soundEnabled: true,
      autoPlay: false,
      theme: 'dark',
      animations: true
    },
    statistics: {
      gamesPlayed: 127,
      totalWagered: 2456.78,
      totalWon: 2123.45,
      winStreak: 3,
      lossStreak: 0,
      bestMultiplier: 15.6
    }
  };

  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

  const epochInfo = useMemo(() => ({
    id: 1247,
    timeRemaining: '14h 32m',
    prizePool: 15420.75,
    participants: 1483
  }), []);

  const walletAddress = "PRIZM-YL3R-GVEP-B8WP-5MUJD";

  const games = useMemo(() => [
    {
      id: 'dice',
      name: 'PLRNG Dice',
      description: 'Advanced probability distribution research',
      icon: Dices,
      category: 'probability',
      color: '#8B5CF6',
      featured: true,
      new: false
    },
    {
      id: 'crash',
      name: 'Crash Study',
      description: 'Algorithmic multiplier research',
      icon: TrendingUp,
      category: 'economics',
      color: '#10B981',
      featured: true,
      new: false
    },
    {
      id: 'plinko',
      name: 'Plinko Physics',
      description: 'Multi-level gravitational analysis',
      icon: Target,
      category: 'physics',
      color: '#F59E0B',
      featured: true,
      new: true
    },
    {
      id: 'mines',
      name: 'Mines Logic',
      description: 'Advanced risk calculation research',
      icon: Grid3X3,
      category: 'logic',
      color: '#EF4444',
      featured: false,
      new: false
    },
    {
      id: 'roulette',
      name: 'Roulette Mechanics',
      description: 'Enhanced wheel probability studies',
      icon: Play,
      category: 'probability',
      color: '#8B5CF6',
      featured: false,
      new: true
    },
    {
      id: 'keno',
      name: 'Keno Numbers',
      description: 'Number theory research',
      icon: Calendar,
      category: 'mathematics',
      color: '#06B6D4',
      featured: false,
      new: false
    }
  ], []);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      background: gameState.settings.theme === 'light' ? '#f8fafc' : '#000',
      color: gameState.settings.theme === 'light' ? '#1e293b' : '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '414px',
      margin: '0 auto',
      transition: 'all 0.3s ease'
    }}>
      {/* Enhanced Header */}
      <Header epochInfo={epochInfo} balance={gameState.balance} walletAddress={walletAddress} gameState={gameState} dispatch={dispatch} />
      
      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'games' && !gameState.selectedGame && (
            <GamesHub 
              key="games-hub" 
              games={games} 
              gameState={gameState}
              onSelectGame={(gameId) => dispatch({ type: 'UPDATE_GAME', payload: gameId })} 
            />
          )}
          {gameState.selectedGame && (
            <GameInterface 
              key={gameState.selectedGame}
              gameId={gameState.selectedGame}
              gameState={gameState}
              dispatch={dispatch}
              onBack={() => dispatch({ type: 'UPDATE_GAME', payload: null })}
            />
          )}
          {activeTab === 'dashboard' && (
            <Dashboard key="dashboard" gameState={gameState} epochInfo={epochInfo} />
          )}
          {activeTab === 'history' && (
            <HistoryView key="history" gameState={gameState} />
          )}
          {activeTab === 'research' && (
            <ResearchView key="research" gameState={gameState} />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {!gameState.selectedGame && (
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} gameState={gameState} />
      )}
    </div>
  );
};

// Enhanced Header Component
const Header: React.FC<{
  epochInfo: any;
  balance: number;
  walletAddress: string;
  gameState: GameState;
  dispatch: (action: any) => void;
}> = memo(({ epochInfo, balance, walletAddress, gameState, dispatch }) => {
  const [showSettings, setShowSettings] = useState(false);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Epoch {epochInfo.id}</div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '6px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px' }}>Sound</span>
                  <button
                    onClick={() => dispatch({ 
                      type: 'UPDATE_SETTINGS', 
                      payload: { soundEnabled: !gameState.settings.soundEnabled } 
                    })}
                    style={{
                      background: gameState.settings.soundEnabled ? '#10B981' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '4px',
                      width: '40px',
                      height: '20px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: '2px',
                      left: gameState.settings.soundEnabled ? '22px' : '2px',
                      transition: 'all 0.2s ease'
                    }} />
                  </button>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px' }}>Animations</span>
                  <button
                    onClick={() => dispatch({ 
                      type: 'UPDATE_SETTINGS', 
                      payload: { animations: !gameState.settings.animations } 
                    })}
                    style={{
                      background: gameState.settings.animations ? '#10B981' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '4px',
                      width: '40px',
                      height: '20px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: '2px',
                      left: gameState.settings.animations ? '22px' : '2px',
                      transition: 'all 0.2s ease'
                    }} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px' }}>Theme</span>
                  <button
                    onClick={() => dispatch({ 
                      type: 'UPDATE_SETTINGS', 
                      payload: { theme: gameState.settings.theme === 'dark' ? 'light' : 'dark' } 
                    })}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      color: '#fff',
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    {gameState.settings.theme === 'dark' ? '🌙' : '☀️'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <motion.div 
              key={balance}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              style={{ fontSize: '28px', fontWeight: '700' }}
            >
              {balance.toFixed(2)} PZM
            </motion.div>
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
          alignItems: 'center',
          backdropFilter: 'blur(10px)'
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
});

// Enhanced GamesHub Component
const GamesHub: React.FC<{
  games: any[];
  gameState: GameState;
  onSelectGame: (gameId: string) => void;
}> = memo(({ games, gameState, onSelectGame }) => {
  const featuredGames = useMemo(() => games.filter(game => game.featured), [games]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px' }}
    >
      {/* Enhanced Statistics Panel */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Research Progress</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '10px',
              fontWeight: '600',
              color: '#10B981'
            }}>
              Win Streak: {gameState.statistics.winStreak}
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.2)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '10px',
              fontWeight: '600',
              color: '#F59E0B'
            }}>
              Best: {gameState.statistics.bestMultiplier}x
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#8B5CF6' }}>
              {gameState.statistics.gamesPlayed}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>Games Played</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>
              {((gameState.statistics.totalWon / gameState.statistics.totalWagered) * 100).toFixed(1)}%
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>Win Rate</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Total Wagered</span>
            <span>{gameState.statistics.totalWagered.toFixed(2)} PZM</span>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((gameState.statistics.totalWon / gameState.statistics.totalWagered) * 100, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #10B981, #059669)',
                borderRadius: '2px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#FCA5A5', marginBottom: '8px' }}>
          ⚠️ Research Platform
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.4 }}>
          These games are experimental research tools for studying algorithmic fairness, not gambling products.
          All outcomes use PLRNG for provable randomness research.
        </div>
      </motion.div>

      {/* Featured Games */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Featured Research</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {featuredGames.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: `linear-gradient(135deg, ${game.color}20, ${game.color}10)`,
                border: `1px solid ${game.color}40`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                width: '100%',
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${game.color}30` }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGame(game.id)}
            >
              {game.new && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: '#10B981',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '8px',
                  fontWeight: '700',
                  color: '#fff'
                }}>
                  NEW
                </div>
              )}
              
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
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectGame(game.id)}
            >
              {game.new && (
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '8px',
                  height: '8px',
                  background: '#10B981',
                  borderRadius: '50%'
                }} />
              )}
              
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
    </motion.div>
  );
});

// Enhanced GameInterface Component
const GameInterface: React.FC<{
  gameId: string;
  gameState: GameState;
  dispatch: (action: any) => void;
  onBack: () => void;
}> = memo(({ gameId, gameState, dispatch, onBack }) => {
  const renderGame = useCallback(() => {
    switch (gameId) {
      case 'dice':
        return <DiceGame gameState={gameState} dispatch={dispatch} />;
      case 'crash':
        return <CrashGame gameState={gameState} dispatch={dispatch} />;
      case 'plinko':
        return <PlinkoGame gameState={gameState} dispatch={dispatch} />;
      case 'mines':
        return <MinesGame gameState={gameState} dispatch={dispatch} />;
      case 'roulette':
        return <RouletteGame gameState={gameState} dispatch={dispatch} onBack={onBack} />;
      default:
        return <div>Game Coming Soon</div>;
    }
  }, [gameId, gameState, dispatch, onBack]);

  // For roulette, return the game directly without the wrapper
  if (gameId === 'roulette') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        {renderGame()}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Enhanced Game Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))',
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)'
      }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
        
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
});

// Enhanced game components with new features would follow similar patterns...
// I'll include one more enhanced component to show the pattern:

const DiceGame: React.FC<{
  gameState: GameState;
  dispatch: (action: any) => void;
}> = memo(({ gameState, dispatch }) => {
  const [rollOver, setRollOver] = useState(50.5);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [autoRoll, setAutoRoll] = useState(false);
  const [autoRollCount, setAutoRollCount] = useState(0);
  const [presetTargets] = useState([2.5, 10, 25, 50, 75, 90, 97.5]);
  const [rollHistory, setRollHistory] = useState<number[]>([]);

  const winChance = rollOver > 50 ? (100 - rollOver) : rollOver;
  const multiplier = useMemo(() => (100 / winChance * 0.99).toFixed(4), [winChance]);

  const rollDice = useCallback(() => {
    setIsRolling(true);
    setTimeout(() => {
      const result = Math.random() * 100;
      setLastResult(result);
      setRollHistory(prev => [...prev.slice(-9), result]);
      setIsRolling(false);
      
      const won = rollOver > 50 ? result > rollOver : result < rollOver;
      const betAmount = parseFloat(gameState.currentBet);
      
      if (won) {
        const winAmount = betAmount * parseFloat(multiplier);
        dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance + winAmount - betAmount });
      } else {
        dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance - betAmount });
      }
      
      dispatch({ 
        type: 'RECORD_GAME', 
        payload: { 
          won, 
          amount: betAmount, 
          multiplier: won ? parseFloat(multiplier) : 0 
        } 
      });

      // Auto-roll functionality
      if (autoRoll && autoRollCount > 0) {
        setAutoRollCount(prev => prev - 1);
        setTimeout(() => {
          if (gameState.balance >= betAmount) {
            rollDice();
          } else {
            setAutoRoll(false);
            setAutoRollCount(0);
          }
        }, 1000);
      }
    }, 2000);
  }, [rollOver, gameState, multiplier, dispatch, autoRoll, autoRollCount]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Enhanced Dice Result with History */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(10px)'
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
          animate={isRolling ? { scale: [1, 1.1, 1], rotate: [0, 180, 360] } : {}}
          transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
        >
          {isRolling ? '?' : lastResult ? lastResult.toFixed(2) : '00.00'}
        </motion.div>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px' }}>
          {lastResult && !isRolling && (
            <span style={{ 
              color: rollOver > 50 ? 
                (lastResult > rollOver ? '#10B981' : '#EF4444') :
                (lastResult < rollOver ? '#10B981' : '#EF4444')
            }}>
              {rollOver > 50 ? 
                (lastResult > rollOver ? '🎉 WIN!' : '❌ Loss') :
                (lastResult < rollOver ? '🎉 WIN!' : '❌ Loss')
              }
            </span>
          )}
        </div>

        {/* Roll History */}
        {rollHistory.length > 0 && (
          <div style={{ 
            display: 'flex', 
            gap: '4px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {rollHistory.map((roll, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: roll < 50 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                  border: `1px solid ${roll < 50 ? '#EF4444' : '#10B981'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8px',
                  fontWeight: '600',
                  color: roll < 50 ? '#EF4444' : '#10B981'
                }}
              >
                {roll.toFixed(0)}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Preset Targets */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Quick Targets</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {presetTargets.map(target => (
              <motion.button
                key={target}
                onClick={() => setRollOver(target)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: rollOver === target ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${rollOver === target ? '#8B5CF6' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {target}
              </motion.button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            Roll {rollOver > 50 ? 'Over' : 'Under'}: {rollOver.toFixed(1)}
          </div>
          <input
            type="range"
            min="1"
            max="99"
            step="0.1"
            value={rollOver}
            onChange={(e) => setRollOver(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: `linear-gradient(to right, 
                #EF4444 0%, 
                #EF4444 ${rollOver}%, 
                rgba(255, 255, 255, 0.2) ${rollOver}%, 
                rgba(255, 255, 255, 0.2) 100%)`,
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none'
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

        {/* Auto-roll Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600' }}>Auto-Roll</span>
            <button
              onClick={() => setAutoRoll(!autoRoll)}
              style={{
                background: autoRoll ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                color: '#fff',
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              {autoRoll ? 'ON' : 'OFF'}
            </button>
          </div>
          {autoRoll && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                min="1"
                max="100"
                value={autoRollCount}
                onChange={(e) => setAutoRollCount(parseInt(e.target.value) || 0)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#fff',
                  fontSize: '12px',
                  width: '60px'
                }}
                placeholder="Rolls"
              />
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>rolls remaining</span>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Bet Amount</div>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={gameState.currentBet}
            onChange={(e) => dispatch({ type: 'UPDATE_BET', payload: e.target.value })}
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

        <motion.button
          onClick={rollDice}
          disabled={isRolling || parseFloat(gameState.currentBet) > gameState.balance}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '16px',
            background: isRolling ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isRolling ? 'not-allowed' : 'pointer',
            boxShadow: isRolling ? 'none' : '0 4px 20px rgba(139, 92, 246, 0.4)'
          }}
        >
          {isRolling ? 'Rolling PLRNG...' : 'Roll Dice'}
        </motion.button>
      </div>
    </div>
  );
});

// Enhanced CrashGame with new features
const CrashGame: React.FC<{
  gameState: GameState;
  dispatch: (action: any) => void;
}> = memo(({ gameState, dispatch }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState<number | null>(null);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [autoCashOutAt, setAutoCashOutAt] = useState(2.0);
  const [crashHistory, setCrashHistory] = useState<number[]>([]);
  const [maxMultiplier, setMaxMultiplier] = useState(1.0);

  const startGame = useCallback(() => {
    setIsGameActive(true);
    setCurrentMultiplier(1.00);
    setHasCashedOut(false);
    const newCrashPoint = 1 + Math.random() * 10;
    setCrashPoint(newCrashPoint);
    setMaxMultiplier(1.0);
    
    const interval = setInterval(() => {
      setCurrentMultiplier(prev => {
        const next = prev + 0.01;
        setMaxMultiplier(Math.max(maxMultiplier, next));
        
        // Auto cash out
        if (autoCashOut && next >= autoCashOutAt && !hasCashedOut) {
          cashOut();
        }
        
        if (next >= newCrashPoint) {
          clearInterval(interval);
          setIsGameActive(false);
          setCrashHistory(prev => [...prev.slice(-9), newCrashPoint]);
          
          if (!hasCashedOut) {
            const betAmount = parseFloat(gameState.currentBet);
            dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance - betAmount });
            dispatch({ 
              type: 'RECORD_GAME', 
              payload: { won: false, amount: betAmount, multiplier: 0 } 
            });
          }
          return next;
        }
        return next;
      });
    }, 50);
  }, [autoCashOut, autoCashOutAt, hasCashedOut, gameState, dispatch, maxMultiplier]);

  const cashOut = useCallback(() => {
    if (isGameActive && !hasCashedOut) {
      setHasCashedOut(true);
      const betAmount = parseFloat(gameState.currentBet);
      const winAmount = betAmount * currentMultiplier;
      dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance + winAmount - betAmount });
      dispatch({ 
        type: 'RECORD_GAME', 
        payload: { won: true, amount: betAmount, multiplier: currentMultiplier } 
      });
    }
  }, [isGameActive, hasCashedOut, gameState, currentMultiplier, dispatch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Enhanced Crash Chart */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        backdropFilter: 'blur(10px)'
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
        
        {/* Status Messages */}
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', minHeight: '20px' }}>
          {!isGameActive && crashPoint && currentMultiplier >= crashPoint && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ color: '#EF4444' }}
            >
              🚫 CRASHED at {crashPoint.toFixed(2)}x
            </motion.span>
          )}
          {hasCashedOut && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ color: '#10B981' }}
            >
              💰 Cashed out at {currentMultiplier.toFixed(2)}x
            </motion.span>
          )}
          {isGameActive && autoCashOut && (
            <span style={{ color: '#F59E0B' }}>
              Auto cash out at {autoCashOutAt}x
            </span>
          )}
        </div>

        {/* Crash History */}
        {crashHistory.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px'
          }}>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>
              Recent Crashes
            </div>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
              {crashHistory.map((crash, index) => (
                <div
                  key={index}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: crash < 2 ? 'rgba(239, 68, 68, 0.3)' : 
                                crash < 5 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                    fontSize: '8px',
                    fontWeight: '600',
                    color: crash < 2 ? '#EF4444' : crash < 5 ? '#F59E0B' : '#10B981'
                  }}
                >
                  {crash.toFixed(1)}x
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Auto Cash Out */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600' }}>Auto Cash Out</span>
            <button
              onClick={() => setAutoCashOut(!autoCashOut)}
              style={{
                background: autoCashOut ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                color: '#fff',
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              {autoCashOut ? 'ON' : 'OFF'}
            </button>
          </div>
          {autoCashOut && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                min="1.01"
                max="100"
                step="0.01"
                value={autoCashOutAt}
                onChange={(e) => setAutoCashOutAt(parseFloat(e.target.value) || 2.0)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#fff',
                  fontSize: '12px',
                  width: '80px'
                }}
              />
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>x multiplier</span>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Research Bet</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={gameState.currentBet}
              onChange={(e) => dispatch({ type: 'UPDATE_BET', payload: e.target.value })}
              disabled={isGameActive}
              style={{
                flex: 1,
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button 
                onClick={() => dispatch({ type: 'UPDATE_BET', payload: (parseFloat(gameState.currentBet) * 2).toFixed(2) })}
                disabled={isGameActive}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#fff',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                2x
              </button>
              <button 
                onClick={() => dispatch({ type: 'UPDATE_BET', payload: (parseFloat(gameState.currentBet) / 2).toFixed(2) })}
                disabled={isGameActive}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: '#fff',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                1/2
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.button
            onClick={startGame}
            disabled={isGameActive || parseFloat(gameState.currentBet) > gameState.balance}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: '16px',
              background: isGameActive ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #10B981, #059669)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isGameActive ? 'not-allowed' : 'pointer',
              boxShadow: isGameActive ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.4)'
            }}
          >
            {isGameActive ? 'In Progress...' : 'Start Research'}
          </motion.button>
          
          <motion.button
            onClick={cashOut}
            disabled={!isGameActive || hasCashedOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: '16px',
              background: (!isGameActive || hasCashedOut) ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (!isGameActive || hasCashedOut) ? 'not-allowed' : 'pointer',
              boxShadow: (!isGameActive || hasCashedOut) ? 'none' : '0 4px 20px rgba(245, 158, 11, 0.4)'
            }}
          >
            Cash Out
          </motion.button>
        </div>
      </div>
    </div>
  );
});

// Enhanced PlinkoGame with multiple difficulty levels
const PlinkoGame: React.FC<{
  gameState: GameState;
  dispatch: (action: any) => void;
}> = memo(({ gameState, dispatch }) => {
  const [isDropping, setIsDropping] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [ballTrail, setBallTrail] = useState<{x: number, y: number}[]>([]);
  const [dropHistory, setDropHistory] = useState<number[]>([]);

  const multiplierSets = useMemo(() => ({
    easy: [0.5, 1.0, 1.5, 2.0, 1.5, 1.0, 0.5],
    medium: [0.2, 0.5, 1.0, 2.0, 5.0, 2.0, 1.0, 0.5, 0.2],
    hard: [0.1, 0.3, 0.5, 1.0, 2.0, 5.0, 10.0, 25.0, 10.0, 5.0, 2.0, 1.0, 0.5, 0.3, 0.1]
  }), []);

  const multipliers = multiplierSets[difficulty];

  const dropBall = useCallback(() => {
    setIsDropping(true);
    setBallTrail([]);
    
    // Simulate ball path
    const pathPoints = Array.from({ length: 20 }, (_, i) => ({
      x: 50 + (Math.random() - 0.5) * 60 * (i / 20),
      y: 10 + (i / 20) * 80
    }));
    
    let trailIndex = 0;
    const trailInterval = setInterval(() => {
      if (trailIndex < pathPoints.length) {
        setBallTrail(prev => [...prev, pathPoints[trailIndex]]);
        trailIndex++;
      } else {
        clearInterval(trailInterval);
      }
    }, 150);

    setTimeout(() => {
      const resultIndex = Math.floor(Math.random() * multipliers.length);
      const multiplier = multipliers[resultIndex];
      setLastResult(multiplier);
      setDropHistory(prev => [...prev.slice(-9), multiplier]);
      setIsDropping(false);
      
      const betAmount = parseFloat(gameState.currentBet);
      const winAmount = betAmount * multiplier;
      dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance + winAmount - betAmount });
      dispatch({ 
        type: 'RECORD_GAME', 
        payload: { 
          won: multiplier > 1, 
          amount: betAmount, 
          multiplier 
        } 
      });
    }, 3000);
  }, [multipliers, gameState, dispatch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Enhanced Plinko Board */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        minHeight: '350px',
        position: 'relative',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px', textAlign: 'center' }}>
          Gravitational Physics Research - {difficulty.toUpperCase()} Mode
        </div>
        
        {/* Ball and Trail Animation */}
        <div style={{ 
          position: 'relative', 
          height: '200px', 
          marginBottom: '20px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* Ball Trail */}
          {ballTrail.map((point, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 - (index / ballTrail.length) * 0.8 }}
              style={{
                position: 'absolute',
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: '8px',
                height: '8px',
                background: '#F59E0B',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Active Ball */}
          {isDropping && (
            <motion.div
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                background: '#F59E0B',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
                left: '50%',
                top: '10%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                y: [0, 180],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          )}
          
          {/* Pins Grid */}
          <div style={{ 
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {[...Array(6)].map((_, row) => (
              <div key={row} style={{ 
                display: 'flex', 
                gap: '16px',
                marginBottom: '12px',
                justifyContent: 'center'
              }}>
                {[...Array(row + 3)].map((_, col) => (
                  <div
                    key={col}
                    style={{
                      width: '6px',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: '50%',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Multipliers Display */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2px' }}>
          {multipliers.map((mult, index) => (
            <motion.div
              key={index}
              style={{
                background: lastResult === mult ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                padding: '6px 4px',
                fontSize: '10px',
                fontWeight: '600',
                textAlign: 'center',
                color: mult >= 10 ? '#10B981' : mult >= 5 ? '#F59E0B' : mult >= 2 ? '#8B5CF6' : '#EF4444',
                flex: 1,
                border: lastResult === mult ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.2)'
              }}
              animate={lastResult === mult ? { scale: [1, 1.1, 1] } : {}}
            >
              {mult}x
            </motion.div>
          ))}
        </div>

        {/* Drop History */}
        {dropHistory.length > 0 && (
          <div style={{
            marginTop: '12px',
            display: 'flex',
            gap: '4px',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>Last:</span>
            {dropHistory.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: result >= 5 ? 'rgba(16, 185, 129, 0.3)' : 
                             result >= 2 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  fontSize: '8px',
                  fontWeight: '600',
                  color: result >= 5 ? '#10B981' : result >= 2 ? '#F59E0B' : '#EF4444'
                }}
              >
                {result}x
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Difficulty Selection */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Difficulty Level</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['easy', 'medium', 'hard'] as const).map(level => (
              <motion.button
                key={level}
                onClick={() => setDifficulty(level)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: difficulty === level ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${difficulty === level ? '#F59E0B' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {level}
              </motion.button>
            ))}
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
            Easy: Lower risk, Medium: Balanced, Hard: High risk/reward
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Research Bet</div>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={gameState.currentBet}
            onChange={(e) => dispatch({ type: 'UPDATE_BET', payload: e.target.value })}
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

        <motion.button
          onClick={dropBall}
          disabled={isDropping || parseFloat(gameState.currentBet) > gameState.balance}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '16px',
            background: isDropping ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isDropping ? 'not-allowed' : 'pointer',
            boxShadow: isDropping ? 'none' : '0 4px 20px rgba(245, 158, 11, 0.4)'
          }}
        >
          {isDropping ? 'Ball Dropping...' : 'Drop Ball'}
        </motion.button>
      </div>
    </div>
  );
});

// Enhanced MinesGame with customizable mine count
const MinesGame: React.FC<{
  gameState: GameState;
  dispatch: (action: any) => void;
}> = memo(({ gameState, dispatch }) => {
  const [grid, setGrid] = useState<Array<'hidden' | 'gem' | 'mine'>>(Array(25).fill('hidden'));
  const [mineCount, setMineCount] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [gemsFound, setGemsFound] = useState(0);
  const [safeSpots, setSafeSpots] = useState<number[]>([]);

  const possibleMines = useMemo(() => [1, 3, 5, 7, 10], []);

  const startGame = useCallback(() => {
    const newGrid = Array(25).fill('hidden');
    setGrid(newGrid);
    setGameStarted(true);
    setCurrentMultiplier(1.0);
    setGemsFound(0);
    
    // Generate safe spots for this round
    const allSpots = Array.from({ length: 25 }, (_, i) => i);
    const mineSpots = [];
    for (let i = 0; i < mineCount; i++) {
      const randomIndex = Math.floor(Math.random() * allSpots.length);
      mineSpots.push(allSpots.splice(randomIndex, 1)[0]);
    }
    setSafeSpots(allSpots);
  }, [mineCount]);

  const revealTile = useCallback((index: number) => {
    if (!gameStarted || grid[index] !== 'hidden') return;
    
    const isMine = !safeSpots.includes(index);
    const newGrid = [...grid];
    
    if (isMine) {
      newGrid[index] = 'mine';
      setGameStarted(false);
      const betAmount = parseFloat(gameState.currentBet);
      dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance - betAmount });
      dispatch({ 
        type: 'RECORD_GAME', 
        payload: { won: false, amount: betAmount, multiplier: 0 } 
      });
    } else {
      newGrid[index] = 'gem';
      const newGemsFound = gemsFound + 1;
      setGemsFound(newGemsFound);
      
      // Calculate multiplier based on risk
      const safeLeft = 25 - mineCount - newGemsFound;
      const multiplierIncrease = (25 - mineCount) / safeLeft;
      setCurrentMultiplier(prev => prev * multiplierIncrease);
    }
    
    setGrid(newGrid);
  }, [gameStarted, grid, safeSpots, gemsFound, mineCount, gameState, dispatch]);

  const cashOut = useCallback(() => {
    if (gameStarted && gemsFound > 0) {
      const betAmount = parseFloat(gameState.currentBet);
      const winAmount = betAmount * currentMultiplier;
      dispatch({ type: 'UPDATE_BALANCE', payload: gameState.balance + winAmount - betAmount });
      dispatch({ 
        type: 'RECORD_GAME', 
        payload: { 
          won: true, 
          amount: betAmount, 
          multiplier: currentMultiplier 
        } 
      });
      setGameStarted(false);
    }
  }, [gameStarted, gemsFound, gameState, currentMultiplier, dispatch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Enhanced Mines Grid */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ 
          fontSize: '12px', 
          color: 'rgba(255, 255, 255, 0.7)', 
          marginBottom: '16px', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Risk Calculation Research</span>
          <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
            <span>Mines: {mineCount}</span>
            <span>Gems: {gemsFound}</span>
            <span style={{ color: '#F59E0B' }}>Multiplier: {currentMultiplier.toFixed(2)}x</span>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '8px',
          marginBottom: '16px'
        }}>
          {grid.map((cell, index) => (
            <motion.button
              key={index}
              onClick={() => revealTile(index)}
              disabled={!gameStarted || cell !== 'hidden'}
              whileHover={gameStarted && cell === 'hidden' ? { scale: 1.05 } : {}}
              whileTap={gameStarted && cell === 'hidden' ? { scale: 0.95 } : {}}
              style={{
                aspectRatio: '1',
                background: cell === 'hidden' ? 'rgba(255, 255, 255, 0.1)' : 
                           cell === 'gem' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                border: `2px solid ${
                  cell === 'hidden' ? 'rgba(255, 255, 255, 0.2)' :
                  cell === 'gem' ? '#10B981' : '#EF4444'
                }`,
                borderRadius: '8px',
                color: '#fff',
                fontSize: '20px',
                fontWeight: '600',
                cursor: gameStarted && cell === 'hidden' ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {cell === 'gem' ? '💎' : cell === 'mine' ? '💥' : '?'}
            </motion.button>
          ))}
        </div>

        {/* Game Progress */}
        {gameStarted && gemsFound > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              Potential Winnings
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>
              {(parseFloat(gameState.currentBet) * currentMultiplier).toFixed(2)} PZM
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Mine Count Selection */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Number of Mines</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {possibleMines.map(count => (
              <motion.button
                key={count}
                onClick={() => setMineCount(count)}
                disabled={gameStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: mineCount === count ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${mineCount === count ? '#EF4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: gameStarted ? 'not-allowed' : 'pointer',
                  opacity: gameStarted ? 0.5 : 1
                }}
              >
                {count}
              </motion.button>
            ))}
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
            More mines = Higher risk & reward
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Research Bet</div>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={gameState.currentBet}
            onChange={(e) => dispatch({ type: 'UPDATE_BET', payload: e.target.value })}
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
          <motion.button
            onClick={startGame}
            disabled={gameStarted || parseFloat(gameState.currentBet) > gameState.balance}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: '16px',
              background: gameStarted ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #EF4444, #DC2626)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: gameStarted ? 'not-allowed' : 'pointer',
              boxShadow: gameStarted ? 'none' : '0 4px 20px rgba(239, 68, 68, 0.4)'
            }}
          >
            {gameStarted ? 'Game Active' : 'Start Game'}
          </motion.button>
          
          <motion.button
            onClick={cashOut}
            disabled={!gameStarted || gemsFound === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: '16px',
              background: (!gameStarted || gemsFound === 0) ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #10B981, #059669)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (!gameStarted || gemsFound === 0) ? 'not-allowed' : 'pointer',
              boxShadow: (!gameStarted || gemsFound === 0) ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.4)'
            }}
          >
            Cash Out
          </motion.button>
        </div>
      </div>
    </div>
  );
});

const Dashboard = memo(({ gameState, epochInfo }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ padding: '20px' }}
  >
    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Enhanced Dashboard</div>
    <div>Advanced analytics and insights coming soon...</div>
  </motion.div>
));

const HistoryView = memo(({ gameState }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ padding: '20px' }}
  >
    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Game History</div>
    <div>Detailed game history and statistics coming soon...</div>
  </motion.div>
));

const ResearchView = memo(({ gameState }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ padding: '20px' }}
  >
    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Research Tools</div>
    <div>Advanced research tools and data analysis coming soon...</div>
  </motion.div>
));

const BottomNavigation: React.FC<{
  activeTab: string;
  setActiveTab: (tab: 'games' | 'dashboard' | 'history' | 'research') => void;
  gameState: GameState;
}> = memo(({ activeTab, setActiveTab, gameState }) => {
  const tabs = useMemo(() => [
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'research', icon: BookOpen, label: 'Research' }
  ], []);

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      style={{
        display: 'flex',
        background: gameState.settings.theme === 'light' ? 
          'rgba(248, 250, 252, 0.9)' : 
          'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${gameState.settings.theme === 'light' ? 
          'rgba(148, 163, 184, 0.2)' : 
          'rgba(255, 255, 255, 0.1)'}`,
        padding: '10px 0 25px'
      }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '10px',
            background: 'none',
            border: 'none',
            color: activeTab === tab.id ? '#8B5CF6' : 
              gameState.settings.theme === 'light' ? 
                'rgba(71, 85, 105, 0.6)' : 
                'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onClick={() => setActiveTab(tab.id as any)}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              style={{
                position: 'absolute',
                top: '-2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#8B5CF6'
              }}
            />
          )}
          <tab.icon size={24} />
          <span style={{ fontSize: '12px', fontWeight: '500' }}>{tab.label}</span>
        </motion.button>
      ))}
    </motion.nav>
  );
});

export default App;
      