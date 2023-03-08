/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import {TNFTCard} from './types';
import styles from "./NFTCard.module.sass";
import { Icon } from "../icon";
import Interpunct from "react-interpunct";

const Card: FC<TNFTCard> = ({ className, item, text }) => {
  const href: string = "/details/" + item.contractItemId + "/" + item.tokenId;

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <img 
          srcSet={item.thumbnailUrl} 
          src={item.thumbnailUrl}
          alt="Card" 
        />
        <div className={styles.control}>
          <Link href={href}>
            <button 
              className={cn("button-small", styles.button)}
            >
              <span>{text}</span>
              <Icon name="scatter-up" size="16" />
            </button>
          </Link>
          
        </div>
      </div>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.songName}</div>
            <div className={styles.price}>{item.mintPrice} FTM</div>
          </div>
          <div className={styles.line}/>
        </div>
        <div className={styles.foot}>
            <div className = {styles.line2}>
              <div className={styles.files}>TokenId: #{item.tokenId}</div>
              <Interpunct />
            </div>

        </div>
    </div>
  );
};

export default Card;