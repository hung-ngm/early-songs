import React, { FC, useState } from 'react';
import { CustomLink } from '../customLink';
import cn from "classnames";
import styles from "./Header.module.sass";
import { Image } from "../image";
import { Icon } from "../icon";
import { User } from "./user";
import Link from "next/link";
import { useSession } from "next-auth/react";


const nav = [
    {
      url: "/explore",
      title: "Explore",
    },
];

const Header: FC = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const uploadTypeOptions = ["Dataset", "Issue"];
  const [uploadType, setUploadType] = useState(uploadTypeOptions[0]);
  const { data: session } = useSession();


  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <CustomLink className={styles.logo} href="/">
          <Image
            className={styles.pic}
            src="/Datahotpot.png"
            alt="Datahotpot"
          />
        </CustomLink>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <CustomLink
                className={styles.link}
                href={x.url}
                key={index}
              >
                {x.title}
              </CustomLink>
            ))}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
          
        </div>
        {(session && session.user) ? (
          <>
            <CustomLink
              className={cn("button-small", styles.button)}
              href="/create-song"
            >
              Create
            </CustomLink>
            <User className={styles.user} />
          </>
        ) : (
          <Link
            className={cn("button-stroke button-small", styles.button)}
            href="/login"
          >
            Connect
          </Link>
        )}
        
        
      </div>
    </header>
  );
}

export default Header;