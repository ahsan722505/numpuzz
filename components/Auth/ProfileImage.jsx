import React from "react";
import Image from "next/image";
import styles from "./ProfileImage.module.scss";
const ProfileImage = ({ src }) => {
  return (
    <div className={styles.imageCont}>
      <Image width={200} height={200} layout="responsive" src={src} />
    </div>
  );
};

export default ProfileImage;
