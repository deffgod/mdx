"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, QrCode, Grid3X3, Calendar, Play, Settings, History, BookOpen, Activity, Zap, Globe, Link } from 'lucide-react';

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
      flexDirection: 'column',
      maxWidth: '414px',
      margin: '0 auto',
      overflowX: 'hidden'
    }}>
      <Header balance={balance} paraminingRate={paraminingRate} walletAddress={walletAddress} />
      
      <main style={{
        flex: 1,
        padding: '20px',
        background: '#000',
        minHeight: 0,
        overflowY: 'auto'
      }}>
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <Dashboard key="dashboard" currentEpoch={currentEpoch} userParticipations={userParticipations} forgingInfo={forgingInfo} />
          )}
          {activeTab === 'picker' && (
            <NumberPicker 
              key="picker" 
              selectedNumbers={selectedNumbers}
              setSelectedNumbers={setSelectedNumbers}
              stakeAmount={stakeAmount}
              setStakeAmount={setStakeAmount}
              balance={balance}
            />
          )}
          {activeTab === 'history' && (
            <HistoryView key="history" userParticipations={userParticipations} />
          )}
          {activeTab === 'research' && (
            <ResearchView key="research" />
          )}
          {activeTab === 'blockchain' && (
            <BlockchainView key="blockchain" blockchainStats={blockchainStats} forgingInfo={forgingInfo} currentEpoch={currentEpoch} />
          )}
        </AnimatePresence>
      </main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const Header: React.FC<{
  balance: number;
  paraminingRate: number;
  walletAddress: string;
}> = ({ balance, paraminingRate, walletAddress }) => {
  return (
    <motion.header 
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
        padding: '0 20px 30px',
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        fontSize: '14px',
        fontWeight: '600',
        position: 'relative',
        zIndex: 1
      }}>
        <span>03:23</span>
        <span>LTE</span>
      </div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          fontSize: '14px',
          fontWeight: '500',
          opacity: 0.9
        }}>
          <span>{walletAddress}</span>
          <button style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer'
          }}>
            <Copy size={16} />
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: 1,
            margin: 0
          }}>{balance.toFixed(2)} PZM</h1>
          <span style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#7C3AED',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>PZM</span>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>Paramining</span>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>{paraminingRate.toFixed(8)}</span>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>$ 0.08</div>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>P 5.76</div>
          <div style={{
            background: 'rgba(239, 68, 68, 0.8)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>- 3.79 %</div>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>CMC</div>
        </div>
      </div>
    </motion.header>
  );
};

const Dashboard: React.FC<{
  currentEpoch: EpochData;
  userParticipations: UserParticipation[];
  forgingInfo: ForgingInfo;
}> = ({ currentEpoch, userParticipations, forgingInfo }) => {
  const totalParticipations = userParticipations.length;
  const totalWinnings = userParticipations.reduce((sum, p) => sum + (p.prize || 0), 0);
  const winRate = userParticipations.filter(p => (p.prize || 0) > 0).length / totalParticipations * 100;

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '15px'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px'
      }}>
        {[QrCode, Grid3X3, Calendar, Play].map((Icon, index) => (
          <div key={index} style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer'
          }}>
            <Icon size={24} />
          </div>
        ))}
      </div>

      <div>
        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Current Epoch</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{currentEpoch.id}</span>
        </div>
        
        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Prize Pool</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{currentEpoch.prizePool.toLocaleString()} PZM</span>
        </div>
        
        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Time Remaining</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{currentEpoch.timeRemaining}</span>
        </div>

        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Total Winnings</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{totalWinnings.toFixed(2)} PZM</span>
        </div>

        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Win Rate</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{winRate.toFixed(1)}%</span>
        </div>

        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Participants</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{currentEpoch.participantCount.toLocaleString()}</span>
        </div>

        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Forging Balance</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{forgingInfo.effectiveBalance.toFixed(2)} PZM</span>
        </div>

        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Next Forging</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{forgingInfo.remaining}</span>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ width: '100%' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>Epoch Progress</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            height: '8px',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div 
              style={{
                background: 'linear-gradient(90deg, #8B5CF6, #7C3AED)',
                height: '100%',
                borderRadius: '4px',
                width: `${((currentEpoch.currentBlock - currentEpoch.startBlock) / 
                        (currentEpoch.endBlock - currentEpoch.startBlock)) * 100}%`
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <span>Block {currentEpoch.currentBlock.toLocaleString()}</span>
            <span>{currentEpoch.endBlock.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NumberPicker: React.FC<{
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
    >
      <div>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Select Your Numbers</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Choose 6 numbers from 1 to 36</p>
      </div>

      <div>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Selected Numbers ({selectedNumbers.length}/6)</h3>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {[...Array(6)].map((_, index) => (
            <div key={index} style={{
              width: '50px',
              height: '50px',
              border: selectedNumbers[index] ? '2px solid #8B5CF6' : '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '600',
              color: selectedNumbers[index] ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              background: selectedNumbers[index] ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'transparent'
            }}>
              {selectedNumbers[index] || '?'}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
        {[...Array(36)].map((_, index) => {
          const number = index + 1;
          const isSelected = selectedNumbers.includes(number);
          const isDisabled = !isSelected && selectedNumbers.length >= 6;
          
          return (
            <motion.button
              key={number}
              style={{
                width: '50px',
                height: '50px',
                border: isSelected ? '2px solid #8B5CF6' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                background: isSelected ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '16px',
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

      <div>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Stake Amount</h3>
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            max={balance}
            style={{
              width: '100%',
              padding: '16px 60px 16px 16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
          <span style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: '600'
          }}>PZM</span>
        </div>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Available: {balance.toFixed(2)} PZM</p>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button 
          onClick={randomPick}
          style={{
            flex: 1,
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
          Random Pick
        </button>
        
        <button 
          disabled={!canParticipate}
          style={{
            flex: 1,
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: canParticipate ? 'pointer' : 'not-allowed',
            border: 'none',
            background: canParticipate ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(255, 255, 255, 0.1)',
            color: canParticipate ? '#fff' : 'rgba(255, 255, 255, 0.5)'
          }}
        >
          Participate in Epoch
        </button>
      </div>
    </motion.div>
  );
};

const HistoryView: React.FC<{
  userParticipations: UserParticipation[];
}> = ({ userParticipations }) => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '15px'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: 0 }}>Participation History</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Total Participations</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{userParticipations.length}</span>
        </div>
        <div style={cardStyle}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Total Winnings</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
            {userParticipations.reduce((sum, p) => sum + (p.prize || 0), 0).toFixed(2)} PZM
          </span>
        </div>
      </div>

      <div>
        {userParticipations.map((participation, index) => (
          <div key={index} style={cardStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <span style={{ fontWeight: '600', fontSize: '16px' }}>Epoch {participation.epochId}</span>
              <span style={{
                color: (participation.prize || 0) > 0 ? '#10B981' : '#EF4444',
                fontWeight: '600'
              }}>
                {participation.matches ? `${participation.matches} matches` : 'No matches'}
              </span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                marginBottom: '10px'
              }}>Your numbers:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {participation.numbers.map((num, i) => (
                  <span key={i} style={{
                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>{num}</span>
                ))}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Stake: {participation.amount} PZM</span>
              {participation.prize && (
                <span style={{ color: '#10B981', fontWeight: '600' }}>Prize: +{participation.prize} PZM</span>
              )}
            </div>
            
            {participation.transactionId && (
              <div style={{ marginTop: '10px', fontSize: '12px' }}>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                  Transaction: {participation.transactionId.substring(0, 16)}...
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Block: {participation.blockHeight?.toLocaleString()} • {new Date(participation.timestamp || 0).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ResearchView: React.FC = () => {
  const sectionStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '20px'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
    >
      <h2 style={{ fontSize: '24px' }}>Research & Education</h2>
      
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        padding: '20px',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ color: '#FCA5A5', marginBottom: '12px', fontSize: '16px' }}>⚠️ Important Disclaimer</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5 }}>
          ParaGame Protocol is an experimental research platform designed for studying 
          algorithmic fairness and game theory. This is NOT an investment product and 
          carries high risk of total loss.
        </p>
      </div>

      <div>
        <div style={sectionStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '18px' }}>How PLRNG Works</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
            The ParaGame Layered Random Number Generator uses multiple entropy sources 
            including blockchain hashes, network state, and participant data to ensure 
            provably fair outcomes.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '18px' }}>Epoch System</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
            Each epoch lasts 1,550 blocks (~24 hours). During this time, participants 
            can register their number combinations. At epoch end, the PLRNG determines 
            winning numbers.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '18px' }}>Prize Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
            {[
              { label: '6 numbers (exact sequence)', percentage: '90% of pool' },
              { label: '6 numbers (any order)', percentage: '50% of remaining' },
              { label: '5 matches', percentage: '25% of remaining' },
              { label: '4 matches', percentage: '15% of remaining' }
            ].map((tier, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{tier.label}</span>
                <span style={{ color: '#8B5CF6', fontWeight: '600' }}>{tier.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '18px' }}>PRIZM Integration</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '15px' }}>
            ParaGame operates exclusively on PRIZM blockchain, utilizing its unique 
            Paramining mechanism and Proof-of-Stake consensus for enhanced security 
            and energy efficiency.
          </p>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.1)', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h4 style={{ color: '#8B5CF6', marginBottom: '8px', fontSize: '14px' }}>Core Features:</h4>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: 1.5, margin: 0, paddingLeft: '20px' }}>
              <li>Built on NXT open-source architecture</li>
              <li>Java-based core with HTTP API (Port 9976)</li>
              <li>Pure Proof-of-Stake consensus mechanism</li>
              <li>Account properties for secure game data storage</li>
              <li>Encrypted messaging for secure communications</li>
              <li>Real-time forging and paramining calculations</li>
            </ul>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={{ color: '#8B5CF6', marginBottom: '12px', fontSize: '18px' }}>Risk Disclosures</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#FCA5A5', fontWeight: '600', fontSize: '14px' }}>High Risk:</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginLeft: '8px' }}>
                Experimental protocol with potential for total loss
              </span>
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#FCD34D', fontWeight: '600', fontSize: '14px' }}>Volatility:</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginLeft: '8px' }}>
                PZM price subject to significant fluctuations
              </span>
            </div>
            
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#93C5FD', fontWeight: '600', fontSize: '14px' }}>Research Only:</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', marginLeft: '8px' }}>
                Not intended as investment or gambling platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlockchainView: React.FC<{
  blockchainStats: BlockchainStats;
  forgingInfo: ForgingInfo;
  currentEpoch: EpochData;
}> = ({ blockchainStats, forgingInfo, currentEpoch }) => {
  const sectionStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '20px'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '15px'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
    >
      <h2 style={{ fontSize: '24px' }}>PRIZM Blockchain</h2>
      
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <Activity size={24} style={{ color: '#8B5CF6' }} />
          <h3 style={{ color: '#8B5CF6', fontSize: '18px', margin: 0 }}>Network Status</h3>
        </div>
        
        <div>
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Current Height</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{blockchainStats.height.toLocaleString()}</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Network State</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#10B981' }}>{currentEpoch.blockchainState}</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Core Version</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{blockchainStats.version}</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Total Accounts</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{blockchainStats.numberOfAccounts.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <Zap size={24} style={{ color: '#8B5CF6' }} />
          <h3 style={{ color: '#8B5CF6', fontSize: '18px', margin: 0 }}>Forging Status</h3>
        </div>
        
        <div>
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Effective Balance</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{forgingInfo.effectiveBalance.toFixed(2)} PZM</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Guaranteed Balance</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{forgingInfo.guaranteedBalance.toFixed(2)} PZM</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Next Hit</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{forgingInfo.remaining}</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Deadline</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{forgingInfo.deadline.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <Globe size={24} style={{ color: '#8B5CF6' }} />
          <h3 style={{ color: '#8B5CF6', fontSize: '18px', margin: 0 }}>Network Statistics</h3>
        </div>
        
        <div>
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Total Transactions</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{blockchainStats.numberOfTransactions.toLocaleString()}</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Total Blocks</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{blockchainStats.numberOfBlocks.toLocaleString()}</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Total Balance</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{(blockchainStats.totalEffectiveBalance / 1000000).toFixed(2)}M PZM</span>
          </div>
          
          <div style={cardStyle}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Last Block</span>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{Math.floor((Date.now() - blockchainStats.lastBlockTime) / 1000)}s ago</span>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <Link size={24} style={{ color: '#8B5CF6' }} />
          <h3 style={{ color: '#8B5CF6', fontSize: '18px', margin: 0 }}>API Endpoints</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Main API</div>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#8B5CF6' }}>http://localhost:9976/prizm</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Block Explorer</div>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#8B5CF6' }}>blockchain.prizm.space</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>Core Status</div>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#8B5CF6' }}>core.prizm.vip</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BottomNavigation: React.FC<{
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'picker' | 'history' | 'research' | 'blockchain') => void;
}> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: Grid3X3, label: 'Dashboard' },
    { id: 'picker', icon: Play, label: 'Play' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'blockchain', icon: Activity, label: 'Blockchain' },
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