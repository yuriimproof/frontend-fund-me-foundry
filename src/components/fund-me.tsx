'use client';

import { contractAbi, contractAddress } from '@/contract/fundMe';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export function FundMe() {
  const [amount, setAmount] = useState('0.01');
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    writeContract,
    isPending: isFundPending,
    error: fundError,
    data: hash,
  } = useWriteContract();

  // Track transaction status to refresh balance after success
  const { isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: fundedAmount, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAmountFundedByAddress',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  // Refetch balance after successful transaction
  useEffect(() => {
    if (isTransactionSuccess) {
      refetch();
    }
  }, [isTransactionSuccess, refetch]);

  const handleFund = async () => {
    if (!amount) return;

    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'fund',
      value: parseEther(amount),
    });
  };

  const handleWithdraw = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'withdraw',
    });
  };

  // Render a placeholder while client-side rendering is happening
  if (!mounted) {
    return (
      <div className="flex flex-col gap-4 p-4 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            ImproofFund Contract
          </h2>
        </div>
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-4 p-4 border dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-center transition-colors">
        <div className="text-center mb-2 dark:text-white">
          Please connect your wallet to interact with the contract
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          ImproofFund Contract
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Interacting with {contractAddress}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount-input" className="text-sm font-medium dark:text-white">
          Amount (ETH)
        </label>
        <div className="flex gap-2">
          <input
            id="amount-input"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-3 py-2 border dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors"
            placeholder="Amount in ETH"
          />
          <button
            type="button"
            onClick={handleFund}
            disabled={isFundPending}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 transition-colors"
          >
            {isFundPending ? 'Funding...' : 'Fund'}
          </button>
        </div>
        {fundError && <p className="text-sm text-red-500 dark:text-red-400">{fundError.message}</p>}
      </div>

      <div className="border-t dark:border-gray-700 pt-4 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium dark:text-white">Your funded amount:</p>
            <p className="text-lg font-bold dark:text-white">
              {fundedAmount ? `${(Number(fundedAmount) / 10 ** 18).toFixed(6)} ETH` : '0 ETH'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleWithdraw}
        className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
      >
        Withdraw All Funds
      </button>
    </div>
  );
}
