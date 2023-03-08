/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import {TCard} from './types';
import styles from "./Card.module.sass";
import { Icon } from "../icon";
import Interpunct from "react-interpunct";
import { getFileSize } from "../../../../utils/getFileSize";

const Card: FC<TCard> = ({ className, item, text }) => {
  const href: string = "/details/" + item.itemId;

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
              <Interpunct />
              <div className={styles.limitSize}>{getFileSize(item.fileSize)}</div>
            </div>

        </div>
    </div>
  );
};

export default Card;