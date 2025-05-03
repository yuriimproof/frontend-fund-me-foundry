import { ConnectWallet } from '@/components/connect-wallet';
import { ContractInfo } from '@/components/contract-info';
import { FundMe } from '@/components/fund-me';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-10 max-w-4xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex-1" />
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent ml-1">
              ImproofFund
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">by Yuri Improof</p>
        </div>
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full sm:w-96 mb-6">
        <ConnectWallet />
      </div>

      <div className="w-full max-w-2xl space-y-6">
        <ContractInfo />
        <FundMe />
      </div>

      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Built by Yuri Improof • Next.js • Tailwind • wagmi</p>
      </footer>
    </main>
  );
}
