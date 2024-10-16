import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SocialMediaModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shareMessage = "Check out PyScript Hotels for reservation";
  const shareUrl = "http://127.0.0.1:5173/rooms";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const platforms = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      icon: <WhatsAppIcon />,
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareMessage)}`,
      icon: <TelegramIcon />,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/`,
      icon: <FacebookIcon />,
    },
    {
      name: "Instagram",
      url: `https://www.instagram.com/`,
      icon: <InstagramIcon />,
    },
    // {name:"Copy", copyToClipboard:`navigator.clipboard.writeText("Check this out: ${shareMessage}")`},
  ];
  return (
    <div>
      <Button onClick={handleOpen}>
        {" "}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Pyscript Hotels where dreams come true
          </Typography>
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              onClick={() => window.open(platform.url)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Share on <span>{platform.name}</span> <span>{platform.icon}</span>
            </Button>
          ))}
          <Button
            onClick={() =>
              navigator.clipboard.writeText(`Check this out: ${shareMessage}`)
            }
          >
            Copy
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SocialMediaModal;