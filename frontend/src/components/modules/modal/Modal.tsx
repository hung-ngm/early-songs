import React, { useCallback, useEffect, useRef, useState, FC } from "react";
import { createPortal } from "react-dom";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Modal.module.sass";
import {Icon} from "../../modules/icon";
import {TModal} from "./types";

const Modal: FC<TModal> = ({
  outerClassName,
  containerClassName,
  visible,
  onClose,
  children,
}) => {
  const escFunction = useCallback(
    (e:any) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    if (visible) {
      const target = document.querySelector("#modal");
      disableBodyScroll(target);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [visible]);

  return (mounted && ref.current) ? createPortal(
    visible && (
      <div className={styles.modal} id="modal">
        <div className={cn(styles.outer, outerClassName)}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <div className={cn(styles.container, containerClassName)}>
              {children}
              <button className={styles.close} onClick={onClose}>
                <Icon name="close" size="14" />
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    ),
    ref.current
  ) : null;
};

export default Modal;