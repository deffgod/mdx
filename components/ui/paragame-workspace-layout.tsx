import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, QrCode, Grid3X3, Calendar, Play, Settings, History, BookOpen, Activity, Zap, Globe, Link, Bell, Search, User, ChevronDown, Maximize2, Minimize2, BarChart3, TrendingUp, Clock, Layers } from 'lucide-react';

interface EpochData {
  id: number;
  startBlock: number;
  endBlock: number;
  currentBlock: number;
  participantCount: number;
  prizePool: number;
  status: 'active' | 'generating' | 'completed';
  winningNumbers?: number[];
  timeRemaining: string;
  blockchainState: string;
  networkDifficulty: number;
  forgingBalance: number;
}

interface UserParticipation {
  epochId: number;
  numbers: number[];
  amount: number;
  matches?: number;
  prize?: number;
  transactionId?: string;
  blockHeight?: number;
  timestamp?: number;
}

interface BlockchainStats {
  height: number;
  lastBlockTime: number;
  totalEffectiveBalance: number;
  numberOfAccounts: number;
  numberOfTransactions: number;
  numberOfBlocks: number;
  version: string;
}

interface ForgingInfo {
  deadline: number;
  hitTime: number;
  remaining: string;
  effectiveBalance: number;
  guaranteedBalance: number;
}

interface Panel {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number; width: number; height: number };
  minimized: boolean;
}

const App: React.FC = () => {
  const [balance] = useState(182.63);
  const [paraminingRate] = useState(0.00776918);
  const [currentEpoch, setCurrentEpoch] = useState<EpochData>({
    id: 1247,
    startBlock: 3450000,
    endBlock: 3451550,
    currentBlock: 3450892,
    participantCount: 1483,
    prizePool: 15420.75,
    status: 'active',
    timeRemaining: '14h 32m',
    blockchainState: 'UNSYNCED',
    networkDifficulty: 15420.75,
    forgingBalance: 182.63
  });

  const [blockchainStats] = useState<BlockchainStats>({
    height: 3482435,
    lastBlockTime: Date.now() - 120000,
    totalEffectiveBalance: 4346406673.89,
    numberOfAccounts: 156789,
    numberOfTransactions: 2456789,
    numberOfBlocks: 3482435,
    version: '1.10.4.7'
  });

  const [forgingInfo] = useState<ForgingInfo>({
    deadline: 1440,
    hitTime: Date.now() + 86400000,
    remaining: '23h 42m',
    effectiveBalance: 182.63,
    guaranteedBalance: 182.63
  });

  const [userParticipations, setUserParticipations] = useState<UserParticipation[]>([
    { 
      epochId: 1246, 
      numbers: [7, 14, 23, 31, 35, 42], 
      amount: 10, 
      matches: 3, 
      prize: 2.5,
      transactionId: '15200507403046301754',
      blockHeight: 3451200,
      timestamp: Date.now() - 86400000
    },
    { 
      epochId: 1245, 
      numbers: [3, 18, 27, 29, 33, 41], 
      amount: 15, 
      matches: 2, 
      prize: 0.8,
      transactionId: '15200507403046301755',
      blockHeight: 3450650,
      timestamp: Date.now() - 172800000
    }
  ]);

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [stakeAmount, setStakeAmount] = useState<string>('10');
  const [panels, setPanels] = useState<Panel[]>([
    { id: 'game', title: 'Game Interface', component: 'game', position: { x: 0, y: 0, width: 60, height: 70 }, minimized: false },
    { id: 'stats', title: 'Statistics', component: 'stats', position: { x: 60, y: 0, width: 40, height: 35 }, minimized: false },
    { id: 'blockchain', title: 'Blockchain', component: 'blockchain', position: { x: 60, y: 35, width: 40, height: 35 }, minimized: false },
    { id: 'history', title: 'History', component: 'history', position: { x: 0, y: 70, width: 100, height: 30 }, minimized: false }
  ]);

  const walletAddress = "PRIZM-YL3R-GVEP-B8WP-5MUJD";

  const togglePanelMinimize = (panelId: string) => {
    setPanels(panels.map(panel => 
      panel.id === panelId 
        ? { ...panel, minimized: !panel.minimized }
        : panel
    ));
  };

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
      {/* Command Bar */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000
      }}>
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={18} />
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>ParaGame Workspace</h1>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Search size={16} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <input
              type="text"
              placeholder="Search workspace..."
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                width: '200px'
              }}
            />
          </div>
        </div>

        {/* Center - Epoch Info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))',
          borderRadius: '16px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Epoch</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#8B5CF6' }}>{currentEpoch.id}</div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Time Left</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{currentEpoch.timeRemaining}</div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Prize Pool</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{currentEpoch.prizePool.toLocaleString()} PZM</div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>Balance:</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{balance.toFixed(2)} PZM</div>
            <Copy size={14} style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.5)' }} />
          </div>

          <div style={{
            background: currentEpoch.blockchainState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            color: currentEpoch.blockchainState === 'UP_TO_DATE' ? '#10B981' : '#EF4444',
            border: `1px solid ${currentEpoch.blockchainState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
          }}>
            {currentEpoch.blockchainState}
          </div>

          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer'
          }}>
            <Settings size={16} />
          </button>
        </div>
      </header>

      {/* Workspace Area */}
      <main style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        {panels.map((panel) => (
          <WorkspacePanel
            key={panel.id}
            panel={panel}
            onMinimize={togglePanelMinimize}
            currentEpoch={currentEpoch}
            userParticipations={userParticipations}
            forgingInfo={forgingInfo}
            blockchainStats={blockchainStats}
            selectedNumbers={selectedNumbers}
            setSelectedNumbers={setSelectedNumbers}
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            balance={balance}
          />
        ))}
      </main>

      {/* Status Bar */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Block Height: {blockchainStats.height.toLocaleString()}</span>
          <span>Version: {blockchainStats.version}</span>
          <span>Paramining: {paraminingRate.toFixed(8)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Participants: {currentEpoch.participantCount.toLocaleString()}</span>
          <span>Last Update: {Math.floor((Date.now() - blockchainStats.lastBlockTime) / 1000)}s ago</span>
        </div>
      </footer>
    </div>
  );
};

const WorkspacePanel: React.FC<{
  panel: Panel;
  onMinimize: (id: string) => void;
  currentEpoch: EpochData;
  userParticipations: UserParticipation[];
  forgingInfo: ForgingInfo;
  blockchainStats: BlockchainStats;
  selectedNumbers: number[];
  setSelectedNumbers: (numbers: number[]) => void;
  stakeAmount: string;
  setStakeAmount: (amount: string) => void;
  balance: number;
}> = ({ 
  panel, 
  onMinimize, 
  currentEpoch, 
  userParticipations, 
  forgingInfo, 
  blockchainStats,
  selectedNumbers,
  setSelectedNumbers,
  stakeAmount,
  setStakeAmount,
  balance
}) => {
  const panelStyle = {
    position: 'absolute' as const,
    left: `${panel.position.x}%`,
    top: `${panel.position.y}%`,
    width: `${panel.position.width}%`,
    height: panel.minimized ? '40px' : `${panel.position.height}%`,
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 10
  };

  const renderPanelContent = () => {
    if (panel.minimized) return null;

    switch (panel.component) {
      case 'game':
        return (
          <GameWorkspacePanel
            selectedNumbers={selectedNumbers}
            setSelectedNumbers={setSelectedNumbers}
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            balance={balance}
            currentEpoch={currentEpoch}
          />
        );
      case 'stats':
        return <StatsWorkspacePanel userParticipations={userParticipations} forgingInfo={forgingInfo} />;
      case 'blockchain':
        return <BlockchainWorkspacePanel blockchainStats={blockchainStats} currentEpoch={currentEpoch} />;
      case 'history':
        return <HistoryWorkspacePanel userParticipations={userParticipations} />;
      default:
        return <div>Unknown panel</div>;
    }
  };

  return (
    <motion.div
      style={panelStyle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Panel Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(139, 92, 246, 0.1)'
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: '#8B5CF6' }}>
          {panel.title}
        </h3>
        <button
          onClick={() => onMinimize(panel.id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {panel.minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
        </button>
      </div>

      {/* Panel Content */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflow: 'auto'
      }}>
        {renderPanelContent()}
      </div>
    </motion.div>
  );
};

const GameWorkspacePanel: React.FC<{
  selectedNumbers: number[];
  setSelectedNumbers: (numbers: number[]) => void;
  stakeAmount: string;
  setStakeAmount: (amount: string) => void;
  balance: number;
  currentEpoch: EpochData;
}> = ({ selectedNumbers, setSelectedNumbers, stakeAmount, setStakeAmount, balance, currentEpoch }) => {
  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const randomPick = () => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 36) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));
  };

  const canParticipate = selectedNumbers.length === 6 && 
                        parseFloat(stakeAmount) > 0 && 
                        parseFloat(stakeAmount) <= balance;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      {/* Selected Numbers */}
      <div>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
          Selected Numbers ({selectedNumbers.length}/6)
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[...Array(6)].map((_, index) => (
            <div key={index} style={{
              width: '40px',
              height: '40px',
              border: selectedNumbers[index] ? '2px solid #8B5CF6' : '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: selectedNumbers[index] ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              background: selectedNumbers[index] ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.05)'
            }}>
              {selectedNumbers[index] || '?'}
            </div>
          ))}
        </div>
      </div>

      {/* Number Grid */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)', 
          gap: '6px',
          marginBottom: '16px'
        }}>
          {[...Array(36)].map((_, index) => {
            const number = index + 1;
            const isSelected = selectedNumbers.includes(number);
            const isDisabled = !isSelected && selectedNumbers.length >= 6;
            
            return (
              <button
                key={number}
                style={{
                  width: '36px',
                  height: '36px',
                  border: isSelected ? '2px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  background: isSelected ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.3 : 1
                }}
                onClick={() => toggleNumber(number)}
                disabled={isDisabled}
              >
                {number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={randomPick}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }}
          >
            🎲 Random
          </button>
          
          <button 
            onClick={() => setSelectedNumbers([])}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444'
            }}
          >
            Clear
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Stake"
            style={{
              width: '100%',
              padding: '12px 40px 12px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px'
            }}
          />
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '12px'
          }}>PZM</span>
        </div>

        <button 
          disabled={!canParticipate}
          style={{
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: canParticipate ? 'pointer' : 'not-allowed',
            border: 'none',
            background: canParticipate ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.1)',
            color: canParticipate ? '#fff' : 'rgba(255, 255, 255, 0.5)'
          }}
        >
          Participate
        </button>
      </div>
    </div>
  );
};

const StatsWorkspacePanel: React.FC<{
  userParticipations: UserParticipation[];
  forgingInfo: ForgingInfo;
}> = ({ userParticipations, forgingInfo }) => {
  const totalWinnings = userParticipations.reduce((sum, p) => sum + (p.prize || 0), 0);
  const winRate = userParticipations.filter(p => (p.prize || 0) > 0).length / userParticipations.length * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Total Winnings</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>{totalWinnings.toFixed(2)} PZM</div>
        </div>
        
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Win Rate</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#8B5CF6' }}>{winRate.toFixed(1)}%</div>
        </div>
      </div>

      <div style={{
        background: 'rgba(245, 158, 11, 0.1)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Next Forging</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#F59E0B' }}>{forgingInfo.remaining}</div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
          Balance: {forgingInfo.effectiveBalance.toFixed(2)} PZM
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>Games Played</div>
        <div style={{ fontSize: '24px', fontWeight: '700' }}>{userParticipations.length}</div>
      </div>
    </div>
  );
};

const BlockchainWorkspacePanel: React.FC<{
  blockchainStats: BlockchainStats;
  currentEpoch: EpochData;
}> = ({ blockchainStats, currentEpoch }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      <div style={{
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Block Height</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#8B5CF6' }}>{blockchainStats.height.toLocaleString()}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '6px',
          padding: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2px' }}>Accounts</div>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>{(blockchainStats.numberOfAccounts / 1000).toFixed(0)}K</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '6px',
          padding: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2px' }}>Version</div>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>{blockchainStats.version}</div>
        </div>
      </div>

      <div style={{
        background: currentEpoch.blockchainState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderRadius: '8px',
        padding: '12px',
        border: `1px solid ${currentEpoch.blockchainState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Network State</div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '700', 
          color: currentEpoch.blockchainState === 'UP_TO_DATE' ? '#10B981' : '#EF4444' 
        }}>
          {currentEpoch.blockchainState}
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        flex: 1
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>Network Stats</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Transactions</span>
            <span>{(blockchainStats.numberOfTransactions / 1000000).toFixed(1)}M</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Balance</span>
            <span>{(blockchainStats.totalEffectiveBalance / 1000000).toFixed(0)}M PZM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryWorkspacePanel: React.FC<{
  userParticipations: UserParticipation[];
}> = ({ userParticipations }) => {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {userParticipations.map((participation, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={14} />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Epoch {participation.epochId}</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: (participation.prize || 0) > 0 ? '#10B981' : '#EF4444'
                }}>
                  {(participation.prize || 0) > 0 ? '+' : '-'} {Math.abs(participation.prize || participation.amount).toFixed(2)} PZM
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '2px' }}>
                {participation.matches ? `${participation.matches} matches` : 'No matches'} • {new Date(participation.timestamp || 0).toLocaleDateString()}
              </div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                {participation.numbers.slice(0, 6).map((num, i) => (
                  <span key={i} style={{
                    background: 'rgba(139, 92, 246, 0.3)',
                    color: '#8B5CF6',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>{num}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;