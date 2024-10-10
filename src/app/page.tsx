"use client";

import Image from "next/image";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { defineChain, getContract, PreparedTransaction } from "thirdweb";
import { arbitrumSepolia, scrollSepoliaTestnet, sepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { balanceOf as balanceOfERC721, claimTo as claimERC721} from "thirdweb/extensions/erc721";
import { balanceOf as balanceOfERC20, claimTo as claimERC20} from "thirdweb/extensions/erc20";
import { balanceOf as balanceOfERC1155, claimTo as claimERC1155} from "thirdweb/extensions/erc1155";

export default function Home() {
  const account = useActiveAccount();
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            accountAbstraction={{
              chain: defineChain(arbitrumSepolia),
              sponsorGas: true
            }}
            wallets={[inAppWallet()]}
          />
        </div>
          <ClaimButtons walletAddress={account?.address || ""}/>
          <WalletBalances walletAddress={account?.address || ""}/>
        {/* <ThirdwebResources /> */}
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      {/* <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      /> */}

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
      Transact
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> MultiChain </span>
      </h1>
    </header>
  );
}

type WalletAddressProps = { walletAddress?: string; }; 
  const neoxContract = getContract({ 
   client: client, 
   chain: defineChain(12227332), 
   address: "0x5C46FF9090F7Bab5AfAd2075C34819ABee3E7A9C"
   }); 
   const arbitrumContract = getContract({ 
    client: client, 
    chain: defineChain(sepolia), 
    address: "0x18fAFaFd3e41756EB9d6ab411506a1Ec2c8762ba"
    }); 
   const scrollContract = getContract({ 
    client: client, 
    chain: defineChain(scrollSepoliaTestnet), 
    address: "0x721f683f7E427853d9122459241c2DDb3Ea6E4dc"
    }); 
    
const ClaimButtons: React.FC<WalletAddressProps> = ({ walletAddress }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-8"> <TransactionButton 
      transaction={() => claimERC721({
      contract: neoxContract,
      to: walletAddress || "",
      quantity: 1n
    })}
    onTransactionConfirmed={async ()=>{
      alert("Claimed Neo X NFT");
    }}>Claim Neo X NFT
    </TransactionButton>
    <TransactionButton 
      transaction={() => claimERC20({
      contract: scrollContract,
      to: walletAddress || "",
      quantity: "10"
    })}
    onTransactionConfirmed={async ()=>{
      alert("Claimed Scroll NFT");
    }}>Claim Scroll NFT
    </TransactionButton>
    <TransactionButton 
      transaction={() => claimERC1155({
      contract: arbitrumContract,
      to: walletAddress || "",
      tokenId: 0n,
      quantity: 1n
    })}
    onTransactionConfirmed={async ()=>{
      alert("Claimed Arbitrum NFT");
    }}>Claim Arbitrum NFT
    </TransactionButton>
    <TransactionButton 
      transaction={() => claimERC1155({
      contract: arbitrumContract,
      to: walletAddress || "",
      tokenId: 1n,
      quantity: 1n
    })}
    onTransactionConfirmed={async ()=>{
      alert("Claimed Arbitrum NFT");
    }}>Claim Arbitrum NFT
    </TransactionButton>
    </div>
  );

// function ThirdwebResources() {
//   return (
//     <div className="grid gap-4 lg:grid-cols-3 justify-center">
//       <ArticleCard
//         title="thirdweb SDK Docs"
//         href="https://portal.thirdweb.com/typescript/v5"
//         description="thirdweb TypeScript SDK documentation"
//       />

//       <ArticleCard
//         title="Components and Hooks"
//         href="https://portal.thirdweb.com/typescript/v5/react"
//         description="Learn about the thirdweb React components and hooks in thirdweb SDK"
//       />

//       <ArticleCard
//         title="thirdweb Dashboard"
//         href="https://thirdweb.com/dashboard"
//         description="Deploy, configure, and manage your smart contracts from the dashboard."
//       />
//     </div>
//   );
// }

// function ArticleCard(props: {
//   title: string;
//   href: string;
//   description: string;
// }) {
//   return (
//     <a
//       href={props.href + "?utm_source=next-template"}
//       target="_blank"
//       className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
//     >
//       <article>
//         <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
//         <p className="text-sm text-zinc-400">{props.description}</p>
//       </article>
//     </a>
  // );
}

const WalletBalances: React.FC<WalletAddressProps> = ({walletAddress}) =>{
  const { data: neoXNFTBalance} = useReadContract(
    balanceOfERC721,
    {
      contract: getContract({
        client: client,
        chain: defineChain(12227332),
        address: "0x5C46FF9090F7Bab5AfAd2075C34819ABee3E7A9C"
      }),
      owner: walletAddress || ""
    }
  );
  const { data: scrollNFTBalance} = useReadContract(
    balanceOfERC20,
    {
      contract: getContract({
        client: client,
        chain: defineChain(scrollSepoliaTestnet),
        address: "0x721f683f7E427853d9122459241c2DDb3Ea6E4dc"
      }),
      address: walletAddress || ""
    }
  );
  const { data: arbitrumNFTBalance1} = useReadContract(
    balanceOfERC1155,
    {
      contract: getContract({
        client: client,
        chain: defineChain(arbitrumSepolia),
        address: "0x18fAFaFd3e41756EB9d6ab411506a1Ec2c8762ba"
      }),
      owner: walletAddress || "",
      tokenId: 0n
    }
  );
  const { data: arbitrumNFTBalance2} = useReadContract(
    balanceOfERC1155,
    {
      contract: getContract({
        client: client,
        chain: defineChain(arbitrumSepolia),
        address: "0x18fAFaFd3e41756EB9d6ab411506a1Ec2c8762ba"
      }),
      owner: walletAddress || "",
      tokenId: 1n
    }
  );

  
return(
  <div>
    <p>Wallet Balances</p>
    <p>Wallet Address {walletAddress ? walletAddress: "No wallet is connected"}</p>
    <p>Neo X NFT:{walletAddress ? neoXNFTBalance?.toString(): '0'}</p>
    <p>Scroll NFT:{walletAddress ? scrollNFTBalance?.toString(): '0'}</p>
    <p>Arbitrum NFT 1: {walletAddress ? arbitrumNFTBalance1?.toString():"0"}</p>
    <p>Arbitrum NFT 2: {walletAddress ? arbitrumNFTBalance2?.toString():"0"}</p>
  </div>
)
};
