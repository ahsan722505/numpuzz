import React from "react";
import Image from "next/image";
const ProfileImage = ({
  src,
  style,
}: {
  src: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className="w-8 h-8 rounded-full" style={{ ...style }}>
      <Image
        width={200}
        height={200}
        layout="responsive"
        className="rounded-full"
        src={src}
      />
    </div>
  );
};

export default ProfileImage;
