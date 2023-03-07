import * as fs from 'fs';
import { ethers } from "hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import * as dotenv from "dotenv";
import hre from "hardhat";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);

const main = async () => {
  console.log("Wallet Ethereum Address:", wallet.address);
      
  const EarlySongsPlatform = await ethers.getContractFactory("EarlySongsPlatform", wallet);
  const earlySongsPlatform = await EarlySongsPlatform.deploy();
  await earlySongsPlatform.deployed();
  console.log("---- EarlySongsPlatform Contract deployed to: ---- ", earlySongsPlatform.address);

  // verify deployed contracts
  // const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
  // await delay(30000);
  // console.log("300 second wait for deploy TX's to propogate to block explorer before verification");
  // await verifyEtherscan(earlySongsPlatform.address);

  const config = `
    export const earlySongsPlatformAddress = "${earlySongsPlatform.address}"
  `
  const data = JSON.stringify(config)
  fs.writeFileSync('cache/deploy.ts', JSON.parse(data))
}

/**
 * Determine if err message can be ignored
 * @param {string} err - the error text returned from etherscan verification
 * @return true if bytecode is verified, false otherwise 
 */
 const alreadyVerified = (err: string) => {
  return err.includes('Reason: Already Verified')
      || err.includes('Contract source code already verified')
}

/**
 * Verify contract on Etherscan or Polygonscan block explorers if possible
 * @notice requires ETHERSCAN and POLYGONSCAN in .env defined for block explorer api access
 * 
 * @param {string} contractAddress - the address of the deployed contract
 */
const verifyEtherscan = async (contractAddress: string) => {
  // check if supported network
  const chainId = ethers.provider._network.chainId;
  console.log('chainId is', chainId);
  const chains = [[1], [4002, 250]]
  if (!chains.flat().includes(chainId) && !chains.flat().includes(chainId)) {
      console.log('Skipping block explorer verification for unsupported network')
      return
  }
  // check if env is configured correctly
  const { FANTOMSCAN } = process.env
  if (chains[1].includes(chainId) && !FANTOMSCAN) {
    console.log(`Fantomscan API key not found, skipping verification on chain ${chainId}`)
    return
  }

  // error message
  const WAIT_ERR = "Wait 100 seconds for tx to propogate and rerun"
  try {
      await hre.run('verify:verify', { address: contractAddress })
  } catch (e: any) {
      if (!alreadyVerified(e.toString())) throw new Error(WAIT_ERR)
      else console.log('=-=-=-=-=\nEarlySongsPlatform.sol already verified\n=-=-=-=-=')
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
