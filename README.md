# Fund Me dApp Frontend

A Next.js frontend for interacting with the Fund Me smart contract built with Foundry.

## Features

- Connect MetaMask or other Ethereum wallets
- View contract information
- Fund the contract with ETH
- Withdraw funds (for contract owner)
- View your funded amount

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- wagmi / viem (for Web3 integration)
- React Query

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- A deployed Fund Me contract on Sepolia testnet or another network

### Setup Instructions

1. Clone this repository:
```bash
git clone <repository-url>
cd frontend-fund-me-foundry
```

2. Install dependencies:
```bash
npm install
```

3. Update the contract address and ABI:
   - Open `src/contract/fundMe.ts`
   - Replace the placeholder contract address with your actual deployed contract address
   - Make sure the ABI matches your contract's ABI

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `/src/app`: Next.js app routes
- `/src/components`: React components
  - `connect-wallet.tsx`: Wallet connection component
  - `fund-me.tsx`: Main component for interacting with the contract
  - `contract-info.tsx`: Displays contract information
- `/src/contract`: Contract ABI and address

## Deployment

To deploy to production, build the application:

```bash
npm run build
```

Then serve the built application:

```bash
npm start
```

## Customization

- Update the contract ABI in `src/contract/fundMe.ts` as needed
- Modify UI components to fit your needs
- Add additional functionality by creating new components or extending existing ones

## License

MIT
