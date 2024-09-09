import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../custom-hooks/useAxios"
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Contact = () => {
  const {user} = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {axiosWithToken} = useAxios()
console.log(user)
  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const message = await axiosWithToken.post("messages", {content:data.message, userId:user?.id})
    console.log(message)
    alert("Your message has been sent successfully!");
    reset();
  };

  const silinecek = async()=>{
    const data = await axiosWithToken("messages")
    console.log(data)
  }

  useEffect(() => {
    silinecek()
  }, [])
  

  return (
    <Box sx={{ p: 4, maxWidth: "lg", margin: "0 auto" }}>
      {/* Title Section */}
      <Typography variant="h3" align="center" gutterBottom>
        Get in Touch with Us
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 4 }}>
        We'd love to hear from you. Whether you have questions about your stay, feedback, or
        any other inquiries, feel free to reach out.
      </Typography>

      {/*  Form and Contact Info */}
      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={4} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contact Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* Name Input */}
                <TextField
                  fullWidth
                  id="name"
                  label="Your Name"
                  variant="outlined"
                  {...register("name", { required: "Name is required", minLength: 3 })}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name must be at least 3 characters"
                        : "Name is required"
                      : ""
                  }
                />

                {/* Email Input */}
                <TextField
                  fullWidth
                  id="email"
                  label="Your Email"
                  variant="outlined"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email ? errors.email.message : ""}
                />

                {/* Message Input */}
                <TextField
                  fullWidth
                  id="message"
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long",
                    },
                  })}
                  error={Boolean(errors.message)}
                  helperText={errors.message ? errors.message.message : ""}
                />

                {/* Submit Button */}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        {/* Contact Information and Map */}
        <Grid item xs={12} md={5}>
          <Paper elevation={4} sx={{ p: 4 }}>
            {/* Contact Information */}
            <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography>
            <Stack spacing={2}>
              {/* Address */}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton disabled>
                  <LocationOn color="primary" />
                </IconButton>
                <Typography>
                  123 Ocean Drive, Miami Beach, FL, 33139, USA
                </Typography>
              </Stack>

              {/* Phone */}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton disabled>
                  <Phone color="primary" />
                </IconButton>
                <Typography>+1 (305) 555-1234</Typography>
              </Stack>

              {/* Email */}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton disabled>
                  <Email color="primary" />
                </IconButton>
                <Typography>info@pyscripthotel.com</Typography>
              </Stack>
            </Stack>

            {/* Google Map Embed */}
            <Box
              sx={{
                width: "100%",
                height: "300px",
                mt: 4,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d145864.40742311336!2d-120.10493419337175!3d36.11350908185277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sKaliforniya%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1725877622901!5m2!1str!2str`}
                allowFullScreen
              ></iframe>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;