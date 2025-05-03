# ImproofFund - Web3 Funding Platform

A modern Next.js frontend for interacting with the ImproofFund smart contract built with Foundry. This dApp allows users to connect their wallets, fund the contract with ETH, and withdraw funds if they're the contract owner.

![ImproofFund Screenshot](https://via.placeholder.com/800x450.png?text=ImproofFund+dApp)

## 🚀 Features

- Connect MetaMask or other Ethereum wallets
- Beautiful UI with light/dark mode toggle
- View contract information (balance, minimum funding amount)
- Fund the contract with ETH
- Withdraw funds (contract owner only)
- Responsive design for all devices
- Fast and optimized performance

## 🛠️ Technologies Used

- **Next.js 15**: React framework with server-side rendering
- **TypeScript**: For type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **wagmi 2.x**: React hooks for Ethereum
- **viem**: TypeScript interface for Ethereum
- **Tanstack React Query**: For data fetching and caching
- **next-themes**: For dark/light mode with system preference detection

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A deployed ImproofFund contract on Sepolia testnet

### Setup Instructions

1. Clone this repository:
```bash
git clone https://github.com/your-username/frontend-fund-me-foundry.git
cd frontend-fund-me-foundry
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
frontend-fund-me-foundry/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   │   ├── connect-wallet.tsx  # Wallet connection
│   │   ├── fund-me.tsx         # Main contract interaction
│   │   ├── theme-toggle.tsx    # Dark/light mode toggle
│   │   └── ui/                 # UI components
│   ├── contract/      # Contract ABI and address
│   └── lib/           # Utility functions
├── next.config.ts     # Next.js configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## 🚢 Deployment

### Vercel Deployment (Recommended)

The project is configured for one-click deployment with Vercel:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "Add New..." > "Project"
4. Select your repository
5. Vercel will automatically detect settings - click "Deploy"

That's it! Your ImproofFund dApp will be live with:
- CI/CD for automatic deployments on push
- Preview deployments for PRs
- Custom domain support
- Analytics and monitoring

### Alternative Deployment Options

You can also deploy using:

- **Docker**: Use the provided Dockerfile (uncomment `output: 'standalone'` in next.config.ts)
- **Static Export**: For GitHub Pages or similar (uncomment `output: 'export'` in next.config.ts)
- **Self-hosted Node.js**: Run `npm run build` and `npm start`

## 🌐 Live Demo

Visit the live demo at [https://improoffund.vercel.app](https://improoffund.vercel.app)

## ✏️ Customization

- Update contract details in `src/contract/fundMe.ts`
- Modify themes in `tailwind.config.js`
- Add custom components in `/src/components`

## 📄 License

MIT

## 👤 Author

Created by Yuri Improof - [GitHub](https://github.com/yourusername)
