import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import StyledLink from "../UI/StyledLink";

const GameLink = ({ url, name }) => {
  return (
    <StyledLink style={{ margin: "0 .6rem" }} href={url}>
      <FontAwesomeIcon style={{ marginRight: ".3rem" }} icon={faPlay} />
      <span>{name}</span>
    </StyledLink>
  );
};

export default GameLink;
