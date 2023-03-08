/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Login.module.sass";
import { Icon } from "../../modules/icon";
import { WalletIcon } from "../../modules/walletIcon";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected';

const menu = [
  {
    title: "MetaMask",
    color: "#F7E1C2",
  },
  {
    title: "Coinbase Wallet",
    color: "#3772FF",
  },
];

const Connect = () => {
    const { signMessageAsync } = useSignMessage();
    const { chain } = useNetwork();
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { data: session, status } = useSession();

    const handleLogin = async () => {
      try {
        const callbackUrl = "/"
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chain?.id,
          nonce: await getCsrfToken(),
        })
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        })
        signIn("credentials", {
          message: JSON.stringify(message),
          redirect: true,
          signature,
          callbackUrl,
        })
      } catch (error) {
        window.alert(error)
      }
    }
    
    useEffect(() => {
      console.log(isConnected);
      if (isConnected && !session) {
        handleLogin()
      }
    }, [isConnected, session])

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link className={styles.back} href="/">
            <Icon name="arrow-prev" size="24" />
            <div className={cn("h2", styles.stage)}>Connect your wallet</div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.menu}>
            {menu.map((x, index) => (
              <div
                className={cn({ [styles.active]: index === 1 }, styles.link)}
                key={index}
                onClick={(e) => {
                  console.log("event", e);
                  e.preventDefault();
                  if (!isConnected) {
                    connect();
                  } else {
                    handleLogin();
                  }
                }}
              >
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <WalletIcon name="metamask" size="40" fill={x.color} />    
                  <Icon name="check" size="18" fill={x.color} />
                </div>
                <span>{x.title}</span>
                <div className={styles.arrow}>
                  <Icon name="arrow-next" size="14" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.bg}>
              <img
                srcSet="/images/content/connect-bg@2x.jpg 2x"
                src="/images/content/connect-bg.jpg"
                alt="Connect wallet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;