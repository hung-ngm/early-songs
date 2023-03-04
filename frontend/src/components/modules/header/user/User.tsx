/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { CustomLink } from "../../customLink";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../../../../styles/modules/header/user/User.module.sass";
import { Icon } from "../../icon";
import { TUser } from "./types";
import { signOut } from "next-auth/react";
// import { useDisconnect } from "wagmi";

const User: FC<TUser> = ({ className }) => {
  const [visible, setVisible] = useState(false);
//   const { disconnect } = useDisconnect();

  const fakeProfileUrl = "https://ohxhbrugimwjgzgtsbtn.supabase.co/storage/v1/object/public/datahotpot/HungProfile.jpeg"
  const fakeName = "Hung Nguyen";
  
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {1 && (
        <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src={fakeProfileUrl ? fakeProfileUrl : "/images/content/avatar-user.jpg"} alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            2.0 <span className={styles.currency}>FTM</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>{fakeName}</div>
            <div className={styles.code}>
              <div className={styles.number}>
                0xe03...4e31
              </div>
              <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/ethereum-circle.jpg"
                    alt="Etherium"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>2 FTM</div>
                </div>
              </div>
              
            </div>
            <div className={styles.menu}>
              <CustomLink
                className={styles.item}
                href={`https://google.com`}
                onClick={() => setVisible(!visible)}
              >
                <div className={styles.icon}>
                  <Icon name="user" size="20" />
                </div>
                <div className={styles.text}>My profile</div>
              </CustomLink>
              
              <a
                className={styles.item}
                style={{ textDecoration: 'none' }}
                href={"/api/auth/signout"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault()
                    //   disconnect()
                  signOut()
                }}
              >
                <div className={styles.icon}>
                  <Icon name="exit" size="20" />
                </div>
                <div className={styles.text}>Disconnect</div>
              </a>  
            </div>
          </div>
        )}
      </div>
      )}
    </OutsideClickHandler>
  );
};

export default User;