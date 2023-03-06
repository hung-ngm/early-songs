import React, { useState, FC } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { TDropdown } from "./types";
import styles from "./Dropdown.module.sass";
import { Icon } from "../icon";

const Dropdown:FC<TDropdown> = ({ className, value, setValue, options }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value:string, index:number) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>{value}</div>
          <div className={styles.arrow}>
            <Icon name="arrow-bottom" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {options.map((x, index) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]: x === value,
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;