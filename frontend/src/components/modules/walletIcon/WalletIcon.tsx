/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import cn from "classnames";
import Image from "next/image";
import { TWalletIcon } from "./types";

const walletIcons: any = {
    metamask: "/images/wallet_metamask.webp",
    coinbase: "/images/wallet_coinbase.webp",
};

const WalletIcon: FC<TWalletIcon> = (props) => {
  const size = props.size ? props.size : 16;
  const fill = props.fill ? props.fill : "inherit";
  return (
    <Image
      className={cn(props.className)}
      src={walletIcons[props.name]} 
      alt="Wallet" 
      width={Number(size)} 
      height={Number(size)} 
    />
  );
};

export default WalletIcon;