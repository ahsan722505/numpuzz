import React, { useState } from "react";
import { Modal } from "antd";
import { useRouter } from "next/router";
import Button from "../number-riddle/Button";
import useConnectFourStore from "../../store/connect-four";

const CopyLink = () => {
  const showLinkModal = useConnectFourStore((state) => state.showLinkModal);
  const setShowLinkModal = useConnectFourStore(
    (state) => state.setShowLinkModal
  );
  const [buttonText, setButtonText] = useState("Copy Link");
  const copyHandler = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setButtonText("Copied!");
  };

  return (
    <Modal
      title="Share this link with your friend."
      footer={null}
      open={showLinkModal}
      onCancel={() => {
        setShowLinkModal(false);
      }}
    >
      <h3 className="text-darkPurple">{window.location.href}</h3>
      <div className="flex justify-end mt-2">
        <Button
          onClick={copyHandler}
          style={{ padding: ".3rem", fontSize: ".8rem", textAlign: "right" }}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};

export default CopyLink;
