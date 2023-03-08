/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import { CustomLink } from "../../modules/customLink";
import cn from "classnames";
import styles from "./Details.module.sass";
// import Control from "./Control";
// import Options from "./Options";
import { TPlatformItem } from "../../../../types/TPlatformItem";
import { TDetails } from "./types";
import { Button } from "../../modules/button";
import { mintNewNFT } from "../../../../pages/api/contracts/mintNewNFT";

const Details: FC<TDetails> = ({ item }) => {
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);

  const handleMintNFT = async (item: TPlatformItem) => {
    setMintLoading(true);
    const res = await mintNewNFT(item.itemId);
    console.log('buy res', res);
    if (res) {
      setMintLoading(false);
      setMintSuccess(true);
    } else {
      setMintLoading(false);
      setMintSuccess(false);
    }
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <img
                srcSet={item.thumbnailUrl}
                src={item.thumbnailUrl}
                alt="Item"
              />
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={cn("h1", styles.title)}>{item.songName}</h1>
            <div className={styles.cate}>
                <div className={cn("status-purple", styles.tag)}>
                    #{item.genres}
                </div>
            </div>

            <h1 className={cn("h3", styles.title)}>Mint for early access</h1>
            <div className={styles.info}>
                {item.alreadyMinted}/{item.maxSupply} already minted
            </div>
            <div className={styles.cost}>
              <div className={styles.col}>
                <div className={cn("status-stroke-green", styles.price)}>
                  {item.mintPrice} FTM
                </div>
              </div>
              <div className={styles.col}>
                <Button
                  loading={mintLoading}
                  success={mintSuccess}
                  disabled={Number(item.alreadyMinted) >= Number(item.maxSupply)}
                  name="Mint Now"
                  onClick={async () => { await handleMintNFT(item) }}
                />
              </div>
              
              
            </div>
            <h2 className={cn("h3", styles.title)}>Data Contract</h2>
            <div className={styles.info}>
              <CustomLink className="" href={`https://testnet.ftmscan.com/address/${item.nftContract}`}>
                <button 
                  className={cn("button", styles.button)}
                >
                  View on FTM Scan
                </button>
              </CustomLink>
            </div>
            <h2 className={cn("h3", styles.title)}>Description</h2>
            <div className={styles.info}>
              {item.description}
            </div>
            <h2 className={cn("h3", styles.title)}>Available: {item.availableDay}</h2>
            <div className={styles.info}>
                Consumers are free to share the NFT after {item.availableDay}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Details;