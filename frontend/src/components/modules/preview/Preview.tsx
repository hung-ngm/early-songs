/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import {Icon} from "../icon";
import {TPreview} from "./types";
import Interpunct from "react-interpunct";

const Preview: FC<TPreview> = ({ className, onClose, songName, mintPrice, thumbnailUrl, songSize }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              srcSet={thumbnailUrl}
              src="/images/content/card-pic-6@2x.jpg"
              alt="Card"
            />
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>{songName?songName:"Set yout song's name"}</div>
                <div className={styles.price}>{mintPrice} FTM</div>
              </div>
            </div>
            <div className={styles.foot}>
              <div className = {styles.line2}>
                  <div className={styles.files}>1 file (MP3)</div>
                  <Interpunct /> 
                  <div className={styles.limitSize}>{songSize} MB</div>
              </div>
              <div className={styles.avatar}>
                  <img src="/images/content/avatar-3.jpg" alt="Avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;