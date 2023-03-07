import React, {FC, useState, useEffect} from "react";
import cn from "classnames";
import styles from "./FollowSteps.module.sass";
import {Icon} from "../../modules/icon";
import { TFollowSteps } from "./types"
// import { createDataNFT } from "../../../../pages/api/contracts/createDataNFT";
// import { mintDataNFT } from "../../../../pages/api/contracts/mintDataNFT";
// import { listDataNFT } from "../../../../pages/api/contracts/listDataNFT";
import { Button } from "../button";

const FollowSteps:FC<TFollowSteps> = ({ 
  className, 
  dataUrl, 
  metadata,
  feeNumerator,
  price 
}) => {
  const [contractLoading, setContractLoading] = useState<boolean>(false);
  const [contractSuccess, setContractSuccess] = useState<boolean>(false);
  const [contractDisabled, setContractDisabled] = useState<boolean>(true);
  const [contractAddress, setContractAddress] = useState<string>("");

  const handleCreateDataContract = async () => {
    setContractLoading(true);
    // const res = await createDataNFT(dataUrl, metadata);
    // if (res) {
    //   setContractAddress(res);
    //   setContractLoading(false);
    //   setContractSuccess(true);
    //   setMintDisabled(false);
    // } else {
    //   setContractLoading(false);
    //   setContractSuccess(false);
    // }
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
        
      </div>
    </div>
  );
};

export default FollowSteps;