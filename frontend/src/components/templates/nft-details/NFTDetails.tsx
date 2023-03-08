/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, FC } from "react";
import { CustomLink } from "../../modules/customLink";
import cn from "classnames";
import styles from "./NFTDetails.module.sass";
// import Control from "./Control";
// import Options from "./Options";
import { TPlatformItem } from "../../../../types/TPlatformItem";
import { TNFTDetails } from "./types";
import { Button } from "../../modules/button";
import { mintNewNFT } from "../../../../pages/api/contracts/mintNewNFT";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

const NFTDetails: FC<TNFTDetails> = ({ item }) => {
  const [audio, setAudio] = useState<ArrayBuffer>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<Record<any, any>>({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState<Record<any, any>>({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();
  
  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch(item.songUrl);
      const buffer = await response.arrayBuffer();
      setAudio(buffer);
    };
    loadAudio();
  }, []);

  const [play, { pause, duration, sound }] = useSound(item.songUrl);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

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

            
            <div className={styles.cost}>
              <div className={styles.col}>
                <div className={cn("status-stroke-green", styles.price)}>
                  {item.mintPrice} FTM
                </div>
              </div>
              
            </div>

            <div className={styles.component}>
                <div className={styles.songBlock}>
                    <div className={styles.time}>
                    <p>
                        {currTime.min}:{currTime.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duration ? duration / 1000 : 0}
                        value={seconds}
                        className={styles.timeline}
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                    />
                </div>

                <div className={styles.playBlock}>
                    <button className={styles.playButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                    </button>
                    {!isPlaying ? (
                    <button className={styles.playButton} onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                    ) : (
                    <button className={styles.playButton} onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                    )}
                    <button className={styles.playButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                    </button>
                </div>
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

export default NFTDetails;