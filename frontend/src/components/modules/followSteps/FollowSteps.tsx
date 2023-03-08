import React, {FC, useState, useEffect} from "react";
import cn from "classnames";
import styles from "./FollowSteps.module.sass";
import {Icon} from "../../modules/icon";
import { TFollowSteps } from "./types"
import { createNewSongContract } from "../../../../pages/api/contracts/createNewSongContract";
import { listSongContract } from "../../../../pages/api/contracts/listSongContract";
import { Button } from "../button";

const FollowSteps:FC<TFollowSteps> = ({ 
  className, 
  metadata,
  timestamp,
  maxSupply,
  mintPrice
}) => {
  const [contractLoading, setContractLoading] = useState<boolean>(false);
  const [contractSuccess, setContractSuccess] = useState<boolean>(false);
  const [contractDisabled, setContractDisabled] = useState<boolean>(true);
  const [contractAddress, setContractAddress] = useState<string>("");

  const [listLoading, setListLoading] = useState<boolean>(false);
  const [listSuccess, setListSuccess] = useState<boolean>(false);
  const [listDisabled, setListDisabled] = useState<boolean>(true);
  
  const handleCreateDataContract = async () => {
    setContractLoading(true);
    console.log('metadata', metadata);
    console.log('timestamp', timestamp);
    console.log('maxSupply', maxSupply);
    const res = await createNewSongContract(
      metadata,
      timestamp,
      maxSupply
    );
    if (res) {
      setContractAddress(res);
      setContractLoading(false);
      setContractSuccess(true);
      setListDisabled(false);
    } else {
      setContractLoading(false);
      setContractSuccess(false);
    }
  }

  const handleListSongContract = async () => {
    setListLoading(true);
    const res = await listSongContract(
      contractAddress,
      mintPrice
    );
    if (res) {
      setListLoading(false);
      setListSuccess(true);
    } else {
      setListLoading(false);
      setListSuccess(false);
    }
  }

  // Useeffect and setButtonDisabled if the metadata is null
  useEffect(() => {
    if (metadata) {
      setContractDisabled(false);
    }
  }, [metadata])

  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn("h4", styles.title)}>Folow steps</div>
      <div className={styles.list}>
        
        <div className={cn(styles.item)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Create NFT Collection</div>
              <div className={styles.text}>Create a NFT colletion for your new released song</div>
            </div>
          </div>
          <Button
            loading={contractLoading}
            success={contractSuccess}
            disabled={contractDisabled}
            name="Create"
            onClick={async () => { await handleCreateDataContract() }}
          />
        </div>

        <div className={cn(styles.item)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>List contract</div>
              <div className={styles.text}>List the contract to the EarlySongs platform</div>
            </div>
          </div>
          <Button
            loading={listLoading}
            success={listSuccess}
            disabled={listDisabled}
            name="List"
            onClick={async () => { await handleListSongContract() }}
          />
        </div>
        
      </div>
    </div>
  );
};

export default FollowSteps;