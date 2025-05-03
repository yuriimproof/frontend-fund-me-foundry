'use client';

import { contractAbi, contractAddress } from '@/contract/fundMe';
import { useCallback, useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { usePublicClient, useReadContract } from 'wagmi';

export function ContractInfo() {
  const { data: minimumUsd } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getMinimumUSD',
  });

  // State for contract balance
  const [balance, setBalance] = useState<bigint | null>(null);

  // Get the public client to query contract balance
  const publicClient = usePublicClient();

  // Function to fetch contract balance (memoized with useCallback)
  const fetchBalance = useCallback(async () => {
    if (!publicClient) return;
    try {
      const contractBalance = await publicClient.getBalance({
        address: contractAddress,
      });
      setBalance(contractBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  }, [publicClient]);

  // Fetch balance on mount and when new blocks arrive
  useEffect(() => {
    if (!publicClient) return;

    // Fetch initial balance
    fetchBalance();

    // Set up block listener
    const unwatch = publicClient.watchBlocks({
      onBlock: () => {
        fetchBalance();
      },
    });

    // Cleanup function
    return () => {
      unwatch();
    };
  }, [publicClient, fetchBalance]);

  // Format the balance and minimum USD safely
  const formattedMinimumUsd =
    minimumUsd && typeof minimumUsd === 'bigint' ? formatEther(minimumUsd) : '0';
  const formattedBalance = balance ? formatEther(balance) : '0';

  return (
    <div className="p-4 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
        Contract Stats
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
          <span className="text-gray-600 dark:text-gray-300">Contract Address:</span>
          <span className="font-mono text-sm truncate max-w-[200px] dark:text-gray-200">
            {contractAddress}
          </span>
        </div>

        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
          <span className="text-gray-600 dark:text-gray-300">Minimum USD:</span>
          <span className="dark:text-gray-200 font-medium">
            {formattedMinimumUsd ? `$${Number(formattedMinimumUsd)}` : 'Loading...'}
          </span>
        </div>

        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
          <span className="text-gray-600 dark:text-gray-300">Contract Balance:</span>
          <span className="dark:text-gray-200 font-medium">{formattedBalance} ETH</span>
        </div>
      </div>
    </div>
  );
}
