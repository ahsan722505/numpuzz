import styles from "./StyledLink.module.scss";
import Link from "next/link";
const StyledLink = (props) => {
  return (
    <Link {...props}>
      <a style={{ ...props.style }} className={styles.link}>
        {props.children}
      </a>
    </Link>
  );
};

export default StyledLink;
