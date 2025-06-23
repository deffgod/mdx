# ParaGame Protocol API Reference

## 🎯 API Overview

ParaGame Protocol provides a comprehensive RESTful API for interacting with the experimental blockchain gaming platform. This API enables developers to integrate with the PRIZM blockchain-based lottery system while maintaining research compliance and security standards.

**Base URL**: `https://api.paragame.protocol/v1`  
**Authentication**: API Key + Signature (PRIZM-compatible)  
**Rate Limiting**: 100 requests/minute (standard), 1000 requests/minute (premium)

---

## ⚠️ **EXPERIMENTAL API WARNING**

This API is part of an **experimental research platform**:
- ❌ Not suitable for production financial applications
- ❌ No guarantees of API stability or data persistence
- ❌ High risk of complete data/fund loss
- ✅ For research and educational purposes only

---

## 🔑 Authentication

### API Key Authentication
```bash
# Required headers for all requests
curl -H "X-API-Key: your_api_key" \
     -H "X-Signature: your_signature" \
     -H "Content-Type: application/json" \
     https://api.paragame.protocol/v1/epochs/current
```

### Signature Generation
```javascript
const crypto = require('crypto');

function generateSignature(method, path, body, timestamp, apiSecret) {
  const message = `${method}${path}${body}${timestamp}`;
  return crypto.createHmac('sha256', apiSecret).update(message).digest('hex');
}

// Example usage
const timestamp = Date.now();
const signature = generateSignature('GET', '/v1/epochs/current', '', timestamp, apiSecret);
```

---

## 📊 Core Endpoints

### 1. Epochs Management

#### Get Current Epoch
```http
GET /v1/epochs/current
```

**Response:**
```json
{
  "success": true,
  "data": {
    "epochId": 1234,
    "status": "REGISTRATION",
    "startBlock": 3456789,
    "endBlock": 3458339,
    "currentBlock": 3457000,
    "remainingBlocks": 1339,
    "estimatedTimeRemaining": "13h 22m 15s",
    "prizePool": "125000.50000000",
    "participantCount": 1847,
    "maxParticipants": 10000,
    "winningNumbers": null,
    "registrationDeadline": "2025-01-15T14:30:00Z"
  },
  "meta": {
    "timestamp": "2025-01-14T15:30:00Z",
    "apiVersion": "1.0.0"
  }
}
```

#### Get Specific Epoch
```http
GET /v1/epochs/{epochId}
```

**Parameters:**
- `epochId` (integer, required): The epoch identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "epochId": 1233,
    "status": "COMPLETED",
    "startBlock": 3454239,
    "endBlock": 3455789,
    "prizePool": "98750.25000000",
    "participantCount": 1523,
    "winningNumbers": [7, 14, 23, 29, 31, 35],
    "winningNumbersGenerated": "2025-01-13T14:45:00Z",
    "prizeDistribution": {
      "exactSequence": {
        "winners": 0,
        "prizePerWinner": "0",
        "totalPrize": "0"
      },
      "allNumbers": {
        "winners": 1,
        "prizePerWinner": "44437.61250000",
        "totalPrize": "44437.61250000"
      },
      "fiveMatch": {
        "winners": 12,
        "prizePerWinner": "1134.75520833",
        "totalPrize": "13617.06250000"
      }
    },
    "rolloverAmount": "40695.57500000"
  }
}
```

#### Get Epoch History
```http
GET /v1/epochs?page={page}&limit={limit}&status={status}
```

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Results per page (default: 20, max: 100)
- `status` (string, optional): Filter by status (REGISTRATION, CLOSED, COMPLETED)

---

### 2. Participation Management

#### Submit Combination
```http
POST /v1/epochs/{epochId}/participate
```

**Request Body:**
```json
{
  "combination": [7, 14, 21, 28, 35, 42],
  "stakeAmount": "100.00000000",
  "participantAddress": "PRIZM-XXXX-XXXX-XXXX-XXXXX",
  "riskAcknowledgment": true,
  "termsAccepted": true,
  "timestamp": "2025-01-14T15:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "participationId": "uuid-participation-id",
    "epochId": 1234,
    "combination": [7, 14, 21, 28, 35, 42],
    "stakeAmount": "100.00000000",
    "registrationBlock": 3457123,
    "transactionHash": "abc123def456...",
    "registeredAt": "2025-01-14T15:30:15Z",
    "participantAddress": "PRIZM-XXXX-XXXX-XXXX-XXXXX"
  },
  "meta": {
    "estimatedConfirmation": "~1 minute",
    "blockConfirmations": 0
  }
}
```

#### Get Participation History
```http
GET /v1/participants/{address}/history?page={page}&limit={limit}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "participations": [
      {
        "participationId": "uuid-participation-id",
        "epochId": 1233,
        "combination": [7, 14, 21, 28, 35, 42],
        "stakeAmount": "100.00000000",
        "status": "COMPLETED",
        "winningNumbers": [7, 14, 23, 29, 31, 35],
        "matches": 2,
        "prizeWon": "0",
        "registeredAt": "2025-01-13T10:15:00Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "pages": 8
  }
}
```

---

### 3. Prize and Results

#### Get Prize Distribution
```http
GET /v1/epochs/{epochId}/prizes
```

**Response:**
```json
{
  "success": true,
  "data": {
    "epochId": 1233,
    "winningNumbers": [7, 14, 23, 29, 31, 35],
    "totalPrizePool": "98750.25000000",
    "distributionTiers": [
      {
        "tier": "EXACT_SEQUENCE",
        "requirement": "6 numbers in exact order",
        "allocation": "90%",
        "winners": 0,
        "prizePerWinner": "0",
        "totalDistributed": "0"
      },
      {
        "tier": "ALL_NUMBERS",
        "requirement": "6 numbers in any order", 
        "allocation": "50% of remaining",
        "winners": 1,
        "prizePerWinner": "44437.61250000",
        "totalDistributed": "44437.61250000"
      },
      {
        "tier": "FIVE_MATCH",
        "requirement": "5 matching numbers",
        "allocation": "25% of remaining",
        "winners": 12,
        "prizePerWinner": "1134.75520833",
        "totalDistributed": "13617.06250000"
      }
    ],
    "unclaimedAmount": "40695.57500000",
    "rolloverToEpoch": 1234
  }
}
```

#### Check Win Status
```http
GET /v1/participants/{address}/wins/{epochId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "participantAddress": "PRIZM-XXXX-XXXX-XXXX-XXXXX",
    "epochId": 1233,
    "combination": [7, 14, 21, 28, 35, 42],
    "winningNumbers": [7, 14, 23, 29, 31, 35],
    "matches": {
      "exactMatches": 2,
      "numberMatches": [7, 14],
      "positionMatches": [0, 1]
    },
    "prizeInfo": {
      "tier": "TWO_MATCH",
      "basePrize": "45.25000000",
      "paraminingBonus": "2.15000000",
      "totalPrize": "47.40000000",
      "claimed": true,
      "claimTransactionHash": "def789ghi012..."
    }
  }
}
```

---

### 4. PLRNG (Random Number Generation)

#### Get Randomness Quality
```http
GET /v1/randomness/quality/{epochId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "epochId": 1233,
    "generatedNumbers": [7, 14, 23, 29, 31, 35],
    "qualityMetrics": {
      "uniformityScore": 0.94,
      "independenceScore": 0.96,
      "patternAnalysis": {
        "consecutiveNumbers": 0,
        "evenOddRatio": 0.5,
        "rangeDistribution": "uniform"
      },
      "entropyMeasurement": 2.58,
      "kolmogorovComplexity": 0.87
    },
    "entropySourceContributions": {
      "blockchain": 0.35,
      "network": 0.25,
      "participants": 0.30,
      "external": 0.10
    },
    "verificationProof": {
      "seed": "abc123def456...",
      "proof": "789ghi012jkl...",
      "verified": true
    }
  }
}
```

#### Verify Random Generation
```http
POST /v1/randomness/verify
```

**Request Body:**
```json
{
  "epochId": 1233,
  "claimedNumbers": [7, 14, 23, 29, 31, 35],
  "generationProof": "789ghi012jkl..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "numbersMatch": true,
    "proofValid": true,
    "entropySourcesVerified": true,
    "verificationDetails": {
      "seedVerification": "PASSED",
      "algorithmVerification": "PASSED",
      "entropyVerification": "PASSED",
      "cryptographicVerification": "PASSED"
    }
  }
}
```

---

### 5. Analytics and Statistics

#### Get Epoch Statistics
```http
GET /v1/analytics/epochs/{epochId}/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "epochId": 1233,
    "participationStats": {
      "totalParticipants": 1523,
      "totalStaked": "152300.00000000",
      "averageStake": "100.00000000",
      "medianStake": "50.00000000",
      "uniqueAddresses": 1401
    },
    "combinationStats": {
      "mostPopularNumbers": [7, 14, 21, 28, 35],
      "leastPopularNumbers": [2, 13, 18, 26, 33],
      "uniqueCombinations": 1456,
      "duplicateCombinations": 67
    },
    "prizeStats": {
      "totalPrizesAwarded": "58054.67500000",
      "winnersCount": 234,
      "largestPrize": "44437.61250000",
      "averagePrize": "248.05630000"
    }
  }
}
```

#### Get Network Statistics  
```http
GET /v1/analytics/network/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "networkHealth": {
      "activeNodes": 1247,
      "blockHeight": 3457890,
      "averageBlockTime": "58.7s",
      "networkHashrate": "N/A (PoS)",
      "totalStaked": "2.4B PZM"
    },
    "protocolStats": {
      "totalEpochs": 1234,
      "activeParticipants": 15678,
      "totalPrizesDistributed": "45.6M PZM",
      "averageEpochParticipation": 1456
    },
    "paraminingStats": {
      "activeParamining": 45678,
      "totalParamined": "1.2B PZM",
      "averageParaminingRate": "0.73% annually"
    }
  }
}
```

---

### 6. Blockchain Integration

#### Get PRIZM Network Info
```http
GET /v1/blockchain/info
```

**Response:**
```json
{
  "success": true,
  "data": {
    "networkId": "PRIZM_MAINNET",
    "blockHeight": 3457890,
    "blockTime": 59.2,
    "difficulty": "18446744073709551615",
    "totalSupply": "4321000000.00000000",
    "circulatingSupply": "4156789123.45678900",
    "activeForgers": 234,
    "networkVersion": "1.10.4.7",
    "lastUpdate": "2025-01-14T15:30:00Z"
  }
}
```

#### Get Transaction Status
```http
GET /v1/blockchain/transactions/{txHash}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionHash": "abc123def456...",
    "blockHeight": 3457123,
    "confirmations": 767,
    "status": "CONFIRMED",
    "type": "PARAGAME_PARTICIPATION",
    "sender": "PRIZM-XXXX-XXXX-XXXX-XXXXX",
    "recipient": "PRIZM-PARA-GAME-POOL-XXXXX",
    "amount": "100.00000000",
    "fee": "1.00000000",
    "timestamp": "2025-01-14T15:30:15Z",
    "attachment": {
      "epochId": 1234,
      "combination": [7, 14, 21, 28, 35, 42]
    }
  }
}
```

---

### 7. Administrative Endpoints

#### Get System Status
```http
GET /v1/admin/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "systemHealth": "HEALTHY",
    "services": {
      "api": "OPERATIONAL",
      "database": "OPERATIONAL", 
      "blockchain": "OPERATIONAL",
      "plrng": "OPERATIONAL",
      "cache": "OPERATIONAL"
    },
    "performance": {
      "responseTime": "120ms",
      "throughput": "45 req/s",
      "errorRate": "0.02%",
      "uptime": "99.97%"
    },
    "lastUpdate": "2025-01-14T15:30:00Z"
  }
}
```

---

## 🔌 WebSocket API

### Connection
```javascript
const ws = new WebSocket('wss://api.paragame.protocol/v1/ws');

// Authentication
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    apiKey: 'your-api-key',
    signature: 'your-signature'
  }));
};
```

### Event Subscriptions
```javascript
// Subscribe to epoch updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'epochs',
  epochId: 1234 // optional, for specific epoch
}));

// Subscribe to participation events
ws.send(JSON.stringify({
  type: 'subscribe', 
  channel: 'participations',
  address: 'PRIZM-XXXX-XXXX-XXXX-XXXXX' // optional
}));

// Subscribe to prize distributions
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'prizes'
}));
```

### Event Types
```javascript
// Epoch update event
{
  "type": "epoch_update",
  "data": {
    "epochId": 1234,
    "remainingBlocks": 1338,
    "participantCount": 1848,
    "prizePool": "125100.50000000"
  }
}

// New participation event  
{
  "type": "new_participation",
  "data": {
    "epochId": 1234,
    "participantAddress": "PRIZM-XXXX-XXXX-XXXX-XXXXX",
    "stakeAmount": "100.00000000",
    "totalParticipants": 1849
  }
}

// Random numbers generated
{
  "type": "numbers_generated",
  "data": {
    "epochId": 1234,
    "winningNumbers": [7, 14, 23, 29, 31, 35],
    "generatedAt": "2025-01-15T14:30:00Z"
  }
}

// Prize distribution event
{
  "type": "prize_distributed",
  "data": {
    "epochId": 1234,
    "participantAddress": "PRIZM-XXXX-XXXX-XXXX-XXXXX",
    "tier": "FIVE_MATCH",
    "prizeAmount": "1134.75520833",
    "transactionHash": "def789ghi012..."
  }
}
```

---

## 📚 SDK Examples

### JavaScript/TypeScript SDK
```javascript
import { ParaGameSDK } from '@paragame/sdk';

const sdk = new ParaGameSDK({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  environment: 'mainnet' // or 'testnet'
});

// Get current epoch
const currentEpoch = await sdk.epochs.getCurrent();

// Submit participation
const participation = await sdk.participate({
  epochId: currentEpoch.epochId,
  combination: [7, 14, 21, 28, 35, 42],
  stakeAmount: '100.00000000',
  participantAddress: 'PRIZM-XXXX-XXXX-XXXX-XXXXX'
});

// Check results
const results = await sdk.epochs.getResults(epochId);
```

### Python SDK
```python
from paragame_sdk import ParaGameClient

client = ParaGameClient(
    api_key='your-api-key',
    api_secret='your-api-secret',
    environment='mainnet'
)

# Get current epoch
current_epoch = client.epochs.get_current()

# Submit participation
participation = client.participate(
    epoch_id=current_epoch['epochId'],
    combination=[7, 14, 21, 28, 35, 42],
    stake_amount='100.00000000',
    participant_address='PRIZM-XXXX-XXXX-XXXX-XXXXX'
)

# Real-time updates
def on_epoch_update(data):
    print(f"Epoch {data['epochId']} updated: {data['remainingBlocks']} blocks remaining")

client.websocket.subscribe('epochs', callback=on_epoch_update)
```

---

## ⚠️ Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_COMBINATION",
    "message": "Combination must contain exactly 6 unique numbers between 1 and 36",
    "details": {
      "provided": [7, 14, 21, 28, 35, 35],
      "issue": "Duplicate number: 35"
    }
  },
  "meta": {
    "timestamp": "2025-01-14T15:30:00Z",
    "requestId": "req-uuid-12345"
  }
}
```

### Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_API_KEY` | API key missing or invalid | 401 |
| `INVALID_SIGNATURE` | Request signature verification failed | 401 |
| `RATE_LIMITED` | Rate limit exceeded | 429 |
| `EPOCH_NOT_FOUND` | Specified epoch does not exist | 404 |
| `EPOCH_CLOSED` | Epoch registration period ended | 400 |
| `INVALID_COMBINATION` | Invalid number combination | 400 |
| `INSUFFICIENT_BALANCE` | Insufficient PZM balance | 400 |
| `DUPLICATE_PARTICIPATION` | Address already participated in epoch | 409 |
| `SYSTEM_MAINTENANCE` | System temporarily unavailable | 503 |

---

## 🔐 Security Considerations

### Rate Limiting
- **Standard**: 100 requests/minute
- **Premium**: 1,000 requests/minute  
- **Burst**: 10 requests/second for short periods

### Data Validation
- All input data validated and sanitized
- Combination numbers must be 1-36, exactly 6 unique values
- Stake amounts must be positive numbers with max 8 decimal places
- Addresses must be valid PRIZM format

### Audit Trail
- All API calls logged with request ID
- Sensitive operations require additional verification
- Real-time monitoring for suspicious activity

---

This API reference provides comprehensive integration capabilities while maintaining the experimental research focus and compliance requirements of the ParaGame Protocol.