import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./Explore.module.sass";
import { Range, getTrackBackground } from "react-range";
import { Icon } from "../../modules/icon";
import { Card } from "../../modules/card";
import Slider from "react-slick";
import { TSlide, TExplore } from "./types";

const SlickArrow: FC<TSlide> = ({children, ...props }) => (
  <button {...props}>{children}</button>
);

const genreOptions = ["Classical", "Country", "Dance & EDM", "Hip-hop & Rap", "Pop", "R&B & Soul"];

const Explore: FC<TExplore> = ({ platformItems }) => {
  console.log("platformItems in explore: ", platformItems);


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
          <div className={styles.title}>Find Your Datasets</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => console.log('a')}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div>
        <div className={styles.wrapper}> 
            <div className={styles.arow}>
                <div className={styles.tag}>
                  <Icon name="lightning" size="20" />
                  <div>All recently released songs</div>
                </div>
                <Slider className="popular-slider" {...settings}>
                    {platformItems?.map((x, index) => (
                        <Card 
                          className={styles.card} 
                          text="View"
                          item={x} 
                          key={index} 
                        />
                    ))}
                </Slider>
            </div>
            {genreOptions.map((genre, index) => (
                <div key={index} className={styles.arow}>
                    <div className={styles.tag}>
                      <Icon name="lightning" size="20" />
                      <div>{genre}</div>
                    </div>
                    <Slider className="popular-slider" {...settings}>
                      {
                        platformItems?.filter((item) => item.genres === genre)
                          .map((x, index) => (
                            <Card 
                              className={styles.card} 
                              text="View"
                              item={x} 
                              key={index} 
                            />
                        ))
                      }
                    </Slider>
                </div>
            ))}
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Explore;