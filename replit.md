# Yujian Markets - BNB Prediction Market Platform

## Project Overview
A fully functional prediction market platform built on Binance Smart Chain (BSC), allowing users to connect MetaMask wallets and make predictions using BNB. The platform features a Binance-inspired design with full Chinese/English language support.

## Current State (as of 2025-10-22)
- ✅ Frontend: Next.js 15 with beautiful Binance-inspired UI
- ✅ Backend: Express server with MongoDB
- ✅ i18n: Chinese/English language switching implemented
- ✅ Design: Complete UI design matching Binance aesthetic with BNB branding
- ⚠️ Blockchain: Currently using Solana adapters (needs replacement with BSC/MetaMask)
- ❌ Smart Contracts: None deployed for BSC
- ❌ Functional Markets: Currently using mock data

## Architecture Plan

### Frontend Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom Binance-inspired theme
- **Wallet**: MetaMask (Web3Modal or RainbowKit for better UX)
- **Web3 Library**: ethers.js v6 or viem
- **State Management**: React Context API
- **i18n**: react-i18next (already implemented)

### Backend Stack
- **Server**: Express.js
- **Database**: MongoDB (for market metadata, user data)
- **Blockchain**: BSC Mainnet/Testnet
- **API**: RESTful + WebSocket for real-time updates

### Smart Contract Architecture
- **Network**: Binance Smart Chain (BSC)
- **Token**: BNB (native)
- **Contract Type**: Automated Market Maker (AMM) style prediction market
- **Key Contracts**:
  1. MarketFactory - Creates new prediction markets
  2. PredictionMarket - Individual market logic (binary outcomes)
  3. MarketResolver - Oracle/resolution mechanism

## Implementation Phases

### Phase 1: Wallet Integration (Week 1)
- [ ] Remove Solana wallet adapters
- [ ] Install and configure Web3Modal or RainbowKit
- [ ] Implement MetaMask connection
- [ ] Add BSC network configuration
- [ ] Create wallet context provider
- [ ] Build "Select Wallet" button UI

### Phase 2: Smart Contracts (Week 2-3)
- [ ] Design prediction market smart contracts
- [ ] Implement market creation logic
- [ ] Implement betting/prediction logic
- [ ] Implement market resolution
- [ ] Implement payout mechanism
- [ ] Deploy to BSC Testnet
- [ ] Audit and test contracts

### Phase 3: Market Creation (Week 4)
- [ ] Build market creation form UI
- [ ] Integrate smart contract deployment
- [ ] Store market metadata in MongoDB
- [ ] Upload market images to IPFS/cloud storage
- [ ] Implement market categories
- [ ] Admin approval workflow

### Phase 4: Betting Interface (Week 5)
- [ ] Build bet placement UI
- [ ] Integrate with smart contracts
- [ ] Show real-time odds updates
- [ ] Display user positions
- [ ] Transaction confirmation UX
- [ ] Error handling and user feedback

### Phase 5: Market Resolution & Payouts (Week 6)
- [ ] Oracle integration for automated resolution
- [ ] Manual resolution interface (admin)
- [ ] Payout calculation
- [ ] Claim winnings UI
- [ ] Transaction history

### Phase 6: User Features (Week 7)
- [ ] User profile pages
- [ ] Betting history
- [ ] Portfolio tracking
- [ ] Leaderboard
- [ ] Referral system

### Phase 7: Polish & Launch (Week 8)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Complete i18n coverage
- [ ] Mobile responsiveness
- [ ] Analytics integration
- [ ] Mainnet deployment

## Key Features to Implement

### Core Functionality
1. **Wallet Connection**: MetaMask with BSC network
2. **Market Browsing**: Categories, search, filters
3. **Market Creation**: Admin/community market creation
4. **Betting**: Place bets with BNB
5. **Real-time Updates**: Live odds, participant counts
6. **Resolution**: Automated + manual oracle
7. **Payouts**: Automatic winner payouts
8. **User Dashboard**: Portfolio, history, stats

### UI Components Needed
- Wallet connection modal
- Market creation form
- Betting modal with amount input
- Transaction pending/success states
- Market detail pages
- User profile pages
- Language switcher (already exists)

## Smart Contract Specifications

### PredictionMarket.sol
```solidity
// Key functions:
- createMarket(question, options, endTime, category)
- placeBet(marketId, option, amount)
- resolveMarket(marketId, winningOption)
- claimWinnings(marketId)
- getMarketInfo(marketId)
- getUserPosition(marketId, user)
```

### Market Structure
- Binary outcomes (YES/NO or Option A/Option B)
- AMM-style pricing (bonding curve)
- Platform fee (1-2%)
- Minimum bet amount
- Maximum bet amount
- Market end time/resolution time

## Database Schema

### Markets Collection
```javascript
{
  _id: ObjectId,
  contractAddress: String,
  question: String,
  description: String,
  category: String,
  imageUrl: String,
  options: [String],
  createdAt: Date,
  endTime: Date,
  resolvedAt: Date,
  winningOption: Number,
  totalVolume: Number,
  participantCount: Number,
  status: String, // 'active', 'pending', 'resolved'
  creator: String,
  translations: {
    zh: { question, description },
    en: { question, description }
  }
}
```

### Users Collection
```javascript
{
  _id: ObjectId,
  address: String,
  username: String,
  totalBets: Number,
  totalWinnings: Number,
  totalLosses: Number,
  createdAt: Date,
  lastActive: Date
}
```

### Bets Collection
```javascript
{
  _id: ObjectId,
  marketId: ObjectId,
  userAddress: String,
  option: Number,
  amount: Number,
  odds: Number,
  potentialWinnings: Number,
  claimed: Boolean,
  createdAt: Date,
  txHash: String
}
```

## Environment Variables Needed
```env
# Frontend
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed.binance.org/
NEXT_PUBLIC_BSC_CHAIN_ID=56
NEXT_PUBLIC_BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
NEXT_PUBLIC_BSC_TESTNET_CHAIN_ID=97
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_API_URL=http://localhost:9000

# Backend
DB_URL=mongodb://...
PORT=9000
BSC_RPC_URL=https://bsc-dataseed.binance.org/
ADMIN_PRIVATE_KEY=0x...  # For market resolution
CONTRACT_ADDRESS=0x...
```

## Design Consistency Guidelines
- Primary Color: #F3BA2F (Binance Gold/BNB Yellow)
- Background: Dark gradients (#0A0A0A, #1A1A1A)
- Accent: White text with gold highlights
- Buttons: Gold gradient hover effects
- Cards: Dark backgrounds with subtle borders
- Typography: Bold headings, clean sans-serif

## Recent Changes
- 2025-10-22: Migrated from Vercel to Replit
- 2025-10-22: Configured for Replit environment (port 5000, proper CORS)
- 2025-10-22: Made database optional for development

## Next Steps
1. Start Phase 1: MetaMask wallet integration
2. Research and select best prediction market smart contract architecture
3. Set up BSC Testnet environment
4. Begin smart contract development
