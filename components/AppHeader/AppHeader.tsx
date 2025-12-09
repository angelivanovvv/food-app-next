import React, { Fragment } from "react";

import { Image, Link } from "@/libs/next";

import AppHeaderBackground from "@/components/HeaderBackground";
import NavLink from "@/components/NavLink";

import logoImg from "@/assets/logo.png";
import classes from "./AppHeader.module.css";

import type { iProps } from "./AppHeader.types";

const AppHeader: React.FC<iProps> = function () {
  return (
    <Fragment>
      <AppHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={logoImg}
            alt="Logo image"
            width={logoImg.width}
            height={logoImg.height}
            priority
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals"> Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};
export default AppHeader;
