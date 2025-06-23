import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, QrCode, Grid3X3, Calendar, Play, Settings, History, BookOpen, Activity, Zap, Globe, Link, Menu, X } from 'lucide-react';

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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'picker' | 'history' | 'research' | 'blockchain'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    blockchainState: 'UP_TO_DATE',
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

  const walletAddress = "PRIZM-YL3R-GVEP-B8WP-5MUJD";

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: sidebarOpen ? 0 : -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 1000,
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>ParaGame</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
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
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Balance</div>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>{balance.toFixed(2)} PZM</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                Paramining: {paraminingRate.toFixed(8)}
              </div>
            </div>
          </div>

          <nav style={{ flex: 1 }}>
            {[
              { id: 'dashboard', icon: Grid3X3, label: 'Dashboard' },
              { id: 'picker', icon: Play, label: 'Play Game' },
              { id: 'history', icon: History, label: 'History' },
              { id: 'blockchain', icon: Activity, label: 'Blockchain' },
              { id: 'research', icon: BookOpen, label: 'Research' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '20px'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>Wallet Address</div>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {walletAddress}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '280px' : '0',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Header */}
        <header style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8B5CF6',
                  cursor: 'pointer'
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '600', 
              margin: 0,
              textTransform: 'capitalize'
            }}>
              {activeTab}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Activity size={16} style={{ color: '#8B5CF6' }} />
              <span style={{ fontSize: '14px' }}>Epoch {currentEpoch.id}</span>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {currentEpoch.timeRemaining}
              </span>
            </div>

            <div style={{
              background: currentEpoch.blockchainState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${currentEpoch.blockchainState === 'UP_TO_DATE' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '500',
              color: currentEpoch.blockchainState === 'UP_TO_DATE' ? '#10B981' : '#EF4444'
            }}>
              {currentEpoch.blockchainState}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main style={{
          flex: 1,
          padding: '40px',
          overflowY: 'auto',
          background: '#000'
        }}>
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <DesktopDashboard key="dashboard" currentEpoch={currentEpoch} userParticipations={userParticipations} forgingInfo={forgingInfo} />
            )}
            {activeTab === 'picker' && (
              <DesktopNumberPicker 
                key="picker" 
                selectedNumbers={selectedNumbers}
                setSelectedNumbers={setSelectedNumbers}
                stakeAmount={stakeAmount}
                setStakeAmount={setStakeAmount}
                balance={balance}
              />
            )}
            {activeTab === 'history' && (
              <DesktopHistoryView key="history" userParticipations={userParticipations} />
            )}
            {activeTab === 'blockchain' && (
              <DesktopBlockchainView key="blockchain" blockchainStats={blockchainStats} forgingInfo={forgingInfo} currentEpoch={currentEpoch} />
            )}
            {activeTab === 'research' && (
              <DesktopResearchView key="research" />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const DesktopDashboard: React.FC<{
  currentEpoch: EpochData;
  userParticipations: UserParticipation[];
  forgingInfo: ForgingInfo;
}> = ({ currentEpoch, userParticipations, forgingInfo }) => {
  const totalParticipations = userParticipations.length;
  const totalWinnings = userParticipations.reduce((sum, p) => sum + (p.prize || 0), 0);
  const winRate = userParticipations.filter(p => (p.prize || 0) > 0).length / totalParticipations * 100;

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  };

  const statCards = [
    { label: 'Current Epoch', value: currentEpoch.id, suffix: '' },
    { label: 'Prize Pool', value: currentEpoch.prizePool.toLocaleString(), suffix: ' PZM' },
    { label: 'Time Remaining', value: currentEpoch.timeRemaining, suffix: '' },
    { label: 'Total Winnings', value: totalWinnings.toFixed(2), suffix: ' PZM' },
    { label: 'Win Rate', value: winRate.toFixed(1), suffix: '%' },
    { label: 'Participants', value: currentEpoch.participantCount.toLocaleString(), suffix: '' },
    { label: 'Forging Balance', value: forgingInfo.effectiveBalance.toFixed(2), suffix: ' PZM' },
    { label: 'Next Forging', value: forgingInfo.remaining, suffix: '' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            style={cardStyle}
            whileHover={{ 
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)'
            }}
          >
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>
              {stat.value}{stat.suffix}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* Epoch Progress */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Epoch Progress</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            height: '12px',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <div 
              style={{
                background: 'linear-gradient(90deg, #8B5CF6, #7C3AED)',
                height: '100%',
                borderRadius: '6px',
                width: `${((currentEpoch.currentBlock - currentEpoch.startBlock) / 
                        (currentEpoch.endBlock - currentEpoch.startBlock)) * 100}%`
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <span>Block {currentEpoch.currentBlock.toLocaleString()}</span>
            <span>{((currentEpoch.currentBlock - currentEpoch.startBlock) / (currentEpoch.endBlock - currentEpoch.startBlock) * 100).toFixed(1)}%</span>
            <span>{currentEpoch.endBlock.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: QrCode, label: 'QR Code' },
              { icon: Grid3X3, label: 'Grid View' },
              { icon: Calendar, label: 'Calendar' },
              { icon: Play, label: 'Play Now' }
            ].map((action, index) => (
              <button
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '20px',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <action.icon size={24} />
                <span style={{ fontSize: '12px', fontWeight: '500' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {userParticipations.slice(0, 3).map((participation, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <Play size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Epoch {participation.epochId}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {participation.matches ? `${participation.matches} matches` : 'No matches'}
                </div>
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: (participation.prize || 0) > 0 ? '#10B981' : '#EF4444'
              }}>
                {(participation.prize || 0) > 0 ? '+' : '-'} {Math.abs(participation.prize || participation.amount).toFixed(2)} PZM
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DesktopNumberPicker: React.FC<{
  selectedNumbers: number[];
  setSelectedNumbers: (numbers: number[]) => void;
  stakeAmount: string;
  setStakeAmount: (amount: string) => void;
  balance: number;
}> = ({ selectedNumbers, setSelectedNumbers, stakeAmount, setStakeAmount, balance }) => {
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

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '30px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}
    >
      {/* Number Selection */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '24px', marginBottom: '8px', color: '#fff' }}>Select Your Numbers</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}>Choose 6 numbers from 1 to 36</p>

        {/* Selected Numbers Display */}
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '16px', color: '#fff' }}>
            Selected Numbers ({selectedNumbers.length}/6)
          </h4>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {[...Array(6)].map((_, index) => (
              <div key={index} style={{
                width: '60px',
                height: '60px',
                border: selectedNumbers[index] ? '2px solid #8B5CF6' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '700',
                color: selectedNumbers[index] ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                background: selectedNumbers[index] ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'transparent'
              }}>
                {selectedNumbers[index] || '?'}
              </div>
            ))}
          </div>
        </div>

        {/* Number Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(9, 1fr)', 
          gap: '12px',
          marginBottom: '30px'
        }}>
          {[...Array(36)].map((_, index) => {
            const number = index + 1;
            const isSelected = selectedNumbers.includes(number);
            const isDisabled = !isSelected && selectedNumbers.length >= 6;
            
            return (
              <motion.button
                key={number}
                style={{
                  width: '60px',
                  height: '60px',
                  border: isSelected ? '2px solid #8B5CF6' : '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  background: isSelected ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.3 : 1
                }}
                onClick={() => toggleNumber(number)}
                disabled={isDisabled}
                whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              >
                {number}
              </motion.button>
            );
          })}
        </div>

        <button 
          onClick={randomPick}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff'
          }}
        >
          🎲 Random Pick
        </button>
      </div>

      {/* Stake & Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>Stake Amount</h3>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max={balance}
              style={{
                width: '100%',
                padding: '20px 60px 20px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '600'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: '600',
              fontSize: '16px'
            }}>PZM</span>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Available: {balance.toFixed(2)} PZM
          </p>
        </div>

        <button 
          disabled={!canParticipate}
          style={{
            padding: '20px',
            borderRadius: '16px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: canParticipate ? 'pointer' : 'not-allowed',
            border: 'none',
            background: canParticipate ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.1)',
            color: canParticipate ? '#fff' : 'rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s'
          }}
        >
          🎮 Participate in Epoch
        </button>

        {/* Game Rules */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '16px', marginBottom: '16px', color: '#8B5CF6' }}>Game Rules</h4>
          <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
            <div style={{ marginBottom: '12px' }}>
              • Select exactly 6 numbers from 1-36
            </div>
            <div style={{ marginBottom: '12px' }}>
              • Minimum stake: 1 PZM
            </div>
            <div style={{ marginBottom: '12px' }}>
              • Epoch duration: ~24 hours
            </div>
            <div>
              • Prizes based on matches
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DesktopHistoryView: React.FC<{
  userParticipations: UserParticipation[];
}> = ({ userParticipations }) => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div style={cardStyle}>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '8px' }}>
            Total Participations
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>
            {userParticipations.length}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '8px' }}>
            Total Winnings
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#10B981' }}>
            {userParticipations.reduce((sum, p) => sum + (p.prize || 0), 0).toFixed(2)} PZM
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '8px' }}>
            Win Rate
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#8B5CF6' }}>
            {(userParticipations.filter(p => (p.prize || 0) > 0).length / userParticipations.length * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* History Table */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '24px', marginBottom: '24px', color: '#fff' }}>Participation History</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {userParticipations.map((participation, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 150px 120px 120px',
              alignItems: 'center',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              gap: '20px'
            }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>Epoch {participation.epochId}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  {participation.blockHeight?.toLocaleString()}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                  Selected Numbers:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {participation.numbers.map((num, i) => (
                    <span key={i} style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      fontSize: '12px'
                    }}>{num}</span>
                  ))}
                </div>
              </div>
              
              <div style={{
                color: (participation.prize || 0) > 0 ? '#10B981' : '#EF4444',
                fontWeight: '600'
              }}>
                {participation.matches ? `${participation.matches} matches` : 'No matches'}
              </div>
              
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Stake: {participation.amount} PZM
              </div>
              
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: (participation.prize || 0) > 0 ? '#10B981' : 'rgba(255, 255, 255, 0.7)'
              }}>
                {participation.prize ? `+${participation.prize} PZM` : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DesktopBlockchainView: React.FC<{
  blockchainStats: BlockchainStats;
  forgingInfo: ForgingInfo;
  currentEpoch: EpochData;
}> = ({ blockchainStats, forgingInfo, currentEpoch }) => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      {/* Network Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Activity size={24} style={{ color: '#8B5CF6' }} />
            <span style={{ color: '#8B5CF6', fontWeight: '600' }}>Block Height</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>
            {blockchainStats.height.toLocaleString()}
          </div>
        </div>
        
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Globe size={24} style={{ color: '#10B981' }} />
            <span style={{ color: '#10B981', fontWeight: '600' }}>Network State</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#10B981' }}>
            {currentEpoch.blockchainState}
          </div>
        </div>
        
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Zap size={24} style={{ color: '#F59E0B' }} />
            <span style={{ color: '#F59E0B', fontWeight: '600' }}>Core Version</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>
            {blockchainStats.version}
          </div>
        </div>
        
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Link size={24} style={{ color: '#EF4444' }} />
            <span style={{ color: '#EF4444', fontWeight: '600' }}>Last Block</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
            {Math.floor((Date.now() - blockchainStats.lastBlockTime) / 1000)}s ago
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Network Statistics */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Globe size={24} style={{ color: '#8B5CF6' }} />
            Network Statistics
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Accounts</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{blockchainStats.numberOfAccounts.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Transactions</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{blockchainStats.numberOfTransactions.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Blocks</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{blockchainStats.numberOfBlocks.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Balance</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{(blockchainStats.totalEffectiveBalance / 1000000).toFixed(2)}M PZM</span>
            </div>
          </div>
        </div>

        {/* Forging Information */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Zap size={24} style={{ color: '#8B5CF6' }} />
            Forging Status
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Effective Balance</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#10B981' }}>{forgingInfo.effectiveBalance.toFixed(2)} PZM</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Guaranteed Balance</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{forgingInfo.guaranteedBalance.toFixed(2)} PZM</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Next Hit</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#8B5CF6' }}>{forgingInfo.remaining}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Deadline</span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{forgingInfo.deadline.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link size={24} style={{ color: '#8B5CF6' }} />
          API Endpoints & Resources
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Main API</div>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#8B5CF6', marginBottom: '8px' }}>
              http://localhost:9976/prizm
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Primary HTTP API endpoint for blockchain interactions
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Block Explorer</div>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#8B5CF6', marginBottom: '8px' }}>
              blockchain.prizm.space
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Web interface for browsing blockchain data
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Core Status</div>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#8B5CF6', marginBottom: '8px' }}>
              core.prizm.vip
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Real-time node status and configuration
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DesktopResearchView: React.FC = () => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '30px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      {/* Disclaimer */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '2px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '20px',
        padding: '30px'
      }}>
        <h3 style={{ color: '#FCA5A5', marginBottom: '16px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          ⚠️ Important Research Disclaimer
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, fontSize: '16px' }}>
          ParaGame Protocol is an experimental research platform designed for studying 
          algorithmic fairness and game theory. This is NOT an investment product and 
          carries high risk of total loss. Participation is for educational and research purposes only.
        </p>
      </div>

      {/* Research Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Technical Details */}
        <div style={cardStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '20px', fontSize: '24px' }}>How PLRNG Works</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '20px' }}>
            The ParaGame Layered Random Number Generator uses multiple entropy sources 
            including blockchain hashes, network state, and participant data to ensure 
            provably fair outcomes.
          </p>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.1)', 
            padding: '20px', 
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h4 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '16px' }}>Entropy Sources:</h4>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0, paddingLeft: '20px' }}>
              <li>Previous block hashes (deterministic)</li>
              <li>Network timestamp variations</li>
              <li>Participant selection patterns</li>
              <li>Account balance distributions</li>
            </ul>
          </div>
        </div>

        {/* Epoch System */}
        <div style={cardStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '20px', fontSize: '24px' }}>Epoch System</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '20px' }}>
            Each epoch lasts 1,550 blocks (~24 hours). During this time, participants 
            can register their number combinations. At epoch end, the PLRNG determines 
            winning numbers.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Epoch Duration</span>
              <span style={{ color: '#8B5CF6', fontWeight: '600' }}>1,550 blocks</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Approximate Time</span>
              <span style={{ color: '#8B5CF6', fontWeight: '600' }}>~24 hours</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Number Range</span>
              <span style={{ color: '#8B5CF6', fontWeight: '600' }}>1-36</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Selection Count</span>
              <span style={{ color: '#8B5CF6', fontWeight: '600' }}>6 numbers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prize Distribution */}
      <div style={cardStyle}>
        <h3 style={{ color: '#8B5CF6', marginBottom: '20px', fontSize: '24px' }}>Prize Distribution Algorithm</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>Tier Structure</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '6 numbers (exact sequence)', percentage: '90% of pool', matches: 6 },
                { label: '6 numbers (any order)', percentage: '50% of remaining', matches: 6 },
                { label: '5 matches', percentage: '25% of remaining', matches: 5 },
                { label: '4 matches', percentage: '15% of remaining', matches: 4 },
                { label: '3 matches', percentage: '10% of remaining', matches: 3 }
              ].map((tier, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>{tier.label}</div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>{tier.matches} match{tier.matches > 1 ? 'es' : ''}</div>
                  </div>
                  <span style={{ color: '#8B5CF6', fontWeight: '600' }}>{tier.percentage}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>Distribution Logic</h4>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <pre style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '12px', 
                lineHeight: 1.4, 
                margin: 0,
                fontFamily: 'monospace'
              }}>
{`1. Collect all stakes → total pool
2. Determine winning numbers via PLRNG
3. Calculate matches for each participant
4. Distribute prizes by tier:
   - Exact sequence: 90% of pool
   - Any order 6: 50% of remaining
   - 5 matches: 25% of remaining
   - 4 matches: 15% of remaining
   - 3 matches: 10% of remaining
5. Remaining funds roll to next epoch`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* PRIZM Integration & Risks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={cardStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '20px', fontSize: '24px' }}>PRIZM Integration</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '20px' }}>
            ParaGame operates exclusively on PRIZM blockchain, utilizing its unique 
            Paramining mechanism and Proof-of-Stake consensus for enhanced security 
            and energy efficiency.
          </p>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.1)', 
            padding: '20px', 
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h4 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '16px' }}>Core Features:</h4>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0, paddingLeft: '20px' }}>
              <li>Built on NXT open-source architecture</li>
              <li>Java-based core with HTTP API (Port 9976)</li>
              <li>Pure Proof-of-Stake consensus mechanism</li>
              <li>Account properties for secure game data storage</li>
              <li>Encrypted messaging for secure communications</li>
              <li>Real-time forging and paramining calculations</li>
            </ul>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: '#EF4444', marginBottom: '20px', fontSize: '24px' }}>Risk Disclosures</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <span style={{ color: '#FCA5A5', fontWeight: '600', fontSize: '16px' }}>High Risk:</span>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '8px 0 0', lineHeight: 1.4 }}>
                Experimental protocol with potential for total loss. No guaranteed returns.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <span style={{ color: '#FCD34D', fontWeight: '600', fontSize: '16px' }}>Volatility:</span>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '8px 0 0', lineHeight: 1.4 }}>
                PZM price subject to significant fluctuations. Market cap under $4M.
              </p>
            </div>
            
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <span style={{ color: '#93C5FD', fontWeight: '600', fontSize: '16px' }}>Research Only:</span>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '8px 0 0', lineHeight: 1.4 }}>
                Not intended as investment or gambling platform. Educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default App;