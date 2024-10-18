import Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";

const iconStyles = {
  cursor: "pointer",
  transition: "transform 0.3s, opacity 0.3s",
};

const containerStyles = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  position: "relative",

  "& .icon": {
    opacity: 1,
  },

  "& .icon:hover": {
    transform: "scale(1.1)",
    opacity: 1,
  },

  "&:hover .icon:not(:hover)": {
    opacity: 0.5,
  },

  "& .icon-whatsapp:hover": {
    color: "#25d366",
  },
  "& .icon-linkedin:hover": {
    color: "#0C63BC",
  },
  "& .icon-github:hover": {
    color: "#1d1a1a",
  },
  "& .icon-email:hover": {
    color: "#d44638",
  },
  "& .icon-telegram:hover": {
    color: "#0088cc",
  },
};

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "5rem",
        padding: "0 10%",
        color:"#fff"
      }}
    >
      <Typography  sx={{fontWeight:"700","@media (max-width: 530px) and (min-width: 344px)":{fontSize:"0.9rem"} }}>© 2024 PyScript Hotels Group</Typography>
      <Box sx={containerStyles}>
        <WhatsAppIcon className="icon icon-whatsapp" sx={iconStyles} />
        <LinkedInIcon className="icon icon-linkedin" sx={iconStyles} />
        <GitHubIcon className="icon icon-github" sx={iconStyles} />
        <EmailIcon className="icon icon-email" sx={iconStyles} />
        <TelegramIcon className="icon icon-telegram" sx={iconStyles} />
      </Box>
    </Box>
  );
};

export default Footer;