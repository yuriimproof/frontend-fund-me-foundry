'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function ConnectWallet() {
  // Add state to handle mounting
  const [mounted, setMounted] = useState(false);
  const { connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  // Only run after component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  // Format the address to show only first 6 and last 4 characters
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // If not mounted yet, render a skeleton version that matches server rendering
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          disabled={true}
          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md opacity-50 w-full font-medium transition-all shadow-md"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  // Button text based on connection status
  const buttonText =
    status === 'pending'
      ? 'Connecting...'
      : isConnected
        ? `Connected: ${formatAddress(address || '')}`
        : 'Connect Wallet';

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleConnect}
        disabled={status === 'pending'}
        className={`px-4 py-3 ${
          isConnected
            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600'
        } text-white rounded-md hover:opacity-90 disabled:opacity-50 w-full font-medium transition-all shadow-md hover:shadow-lg`}
      >
        {buttonText}
      </button>
      {error && <p className="text-sm text-red-500 dark:text-red-400">{error.message}</p>}
    </div>
  );
}
