import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import { Range, getTrackBackground } from "react-range";
import { Icon } from "../../modules/icon";
import { NFTCard } from "../../modules/nftCard";
import Slider from "react-slick";
import { TSlide, TUser } from "./types";

const SlickArrow: FC<TSlide> = ({children, ...props }) => (
  <button {...props}>{children}</button>
);

const User: FC<TUser> = ({ nftItems }) => {
  console.log("nftItems in user: ", nftItems);

  const [search, setSearch] = useState("");

  const [values, setValues] = useState([5]);

  //setting for slider show
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
        <SlickArrow>
            <Icon name="arrow-next" size="14" />
        </SlickArrow>
    ),
    prevArrow: (
        <SlickArrow>
            <Icon name="arrow-prev" size="14" />
        </SlickArrow>
    ),
    responsive: [
        {
          breakpoint: 1179,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            infinite: true,
          },
        },
      ],
  };

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>My Collection</div>
          
        </div>
        <div className={styles.wrapper}> 
            <div className={styles.arow}>
                <div className={styles.tag}>
                  <Icon name="lightning" size="20" />
                  <div>All NFTs</div>
                </div>
                <Slider className="popular-slider" {...settings}>
                    {nftItems?.map((x, index) => (
                        <NFTCard 
                          className={styles.card} 
                          text="View"
                          item={x} 
                          key={index} 
                        />
                    ))}
                </Slider>
            </div>
           
            
          </div>
      </div>
    </div>
  );
};

export default User;