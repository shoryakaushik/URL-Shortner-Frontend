/**
 * @fileoverview displays title
 * Created on: 06/05/2021
 * @author shorya kaushik
 */

import "./styles.scss";

import * as React from "react";
import { TitleInterface } from "./interface";

const Title: React.FC<TitleInterface> = (props: TitleInterface) => {
  const { children, className } = props;

  return (
    <header className={`title-atom ${className || ""}`}>{children}</header>
  );
};

export default Title;
