import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: ".8rem",
        p: "1rem",
        color: "white",
        textShadow:"1px 3px 10px rgba(1, 10, 10, 0.8)"
      }}
    >
      <Typography variant="h3">About Us</Typography>
      <Typography variant="h4">Welcome to PyScript Hotel</Typography>
      <Typography variant="h5">Where Dreams Come True!</Typography>
      <Typography variant="p">
        At PyScript Hotel, we believe that a great stay is more than just a
        room; it’s an experience. Our vision? To create more than just a hotel
        stay but to offer our guests an unforgettable lifestyle experience that
        is as welcoming as it is innovative.
      </Typography>
      <Typography variant="h3">Our Mission</Typography>
      <Typography variant="p">
        PyScript Hotel is not just about providing accommodation. We are
        committed to delivering world-class service, ensuring that every detail
        of your stay is perfected. Whether you’re here for business, leisure, or
        a family vacation, we strive to create an environment that blends
        luxury, comfort, and warmth. We focus on crafting memorable experiences,
        personalizing each stay to meet the unique needs and desires of our
        guests. Because at PyScript Hotel, we believe you deserve the best—every
        time, everywhere.
      </Typography>
      <Typography variant="h3">
        The PyScript Philosophy: More Than a Lifestyle
      </Typography>
      <Typography variant="p">
        Our philosophy revolves around delivering more than just a bed to sleep
        in. At PyScript, "more than a lifestyle" is our promise to you. We want
        our guests to feel like they are part of something larger than
        themselves—a lifestyle that emphasizes comfort, convenience, and most
        importantly, a sense of belonging. From our chic room designs to the
        ambient lighting in our lounges, every aspect of PyScript Hotel is
        carefully curated to ensure you enjoy life’s finer moments. We believe
        in combining the best of technology with the warmth of human connection.
        Whether you’re checking in, ordering room service, or booking your next
        adventure with us, our seamless processes and attentive staff ensure
        your journey with us is effortless and stress-free.
      </Typography>
      <Typography variant="h3">A Global Vision with Local Warmth</Typography>
      <Typography variant="p">
        Although we are working on expanding our footprint globally, we maintain
        the heart and soul of a local business that knows the value of
        personalized service. Each of our properties is a reflection of the
        community in which it is based, blending local culture with
        international hospitality standards. Our team is always at the forefront
        of industry trends, ensuring our guests are always experiencing
        cutting-edge comfort. Yet, we never forget the timeless essentials of
        hospitality: a friendly smile, attention to detail, and making sure you
        always feel at home.
      </Typography>
      <Typography variant="h3">
        Our Services: Your Comfort Is Our Priority
      </Typography>
      <Typography variant="p">
        When you stay with PyScript Hotel, you can rest assured that every
        element of your visit is crafted to exceed your expectations. We offer:
      </Typography>
      <List>
        <ListItem>
          <Typography variant="h6">Luxurious Rooms & Suites:</Typography>
          <Typography variant="p">
            Designed with elegance and comfort, our accommodations are the
            perfect retreat after a long day. With plush bedding, spacious
            layouts, and modern amenities, we cater to both relaxation and
            productivity.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">World-Class Dining:</Typography>
          <Typography variant="p">
            Indulge in a culinary experience with our in-house restaurants,
            offering a range of international and local delicacies prepared by
            our renowned chefs.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">Wellness & Leisure:</Typography>
          <Typography variant="p">
            From state-of-the-art fitness centers to serene spa treatments, your
            wellness is our priority. Enjoy a dip in our heated pools, or spend
            some time rejuvenating your body and mind in our wellness spaces.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">Meetings & Events:</Typography>
          <Typography variant="p">
            Whether you're hosting a corporate retreat, a family celebration, or
            a grand event, our versatile event spaces and attentive staff ensure
            that every occasion is a success.
          </Typography>
        </ListItem>
      </List>
      <Typography variant="h4">
        Our Promise: Quality and Affordability
      </Typography>
      <Typography variant="p">
        We understand that luxury shouldn't always come with an extravagant
        price tag. At PyScript Hotel, we are dedicated to providing the best
        quality at the best prices. We believe that everyone deserves to
        experience the finer things in life, which is why we constantly work to
        offer affordable rates without compromising on service. Our goal is
        simple: to make you smile. Your comfort is not just a priority—it’s our
        promise.
      </Typography>
      <Typography variant="h4">Why Choose Us?</Typography>
      <Typography variant="p">
        We pride ourselves on being at the intersection of innovation and
        comfort. Our strong IT background allows us to bring technology to the
        forefront of your experience, from seamless digital check-ins to smart
        room controls that ensure you’re always connected and in control. At the
        same time, we never lose sight of the importance of personal, human
        touch in hospitality. With PyScript Hotel, you get:
      </Typography>
      <List>
        <ListItem>
          A passionate and dedicated team ready to serve you 24/7.
        </ListItem>
        <ListItem>
          Thoughtfully designed rooms that combine luxury, comfort, and
          cutting-edge technology.
        </ListItem>
        <ListItem>
          A lifestyle experience that goes beyond just a stay—it’s a way of
          life.
        </ListItem>
      </List>
      <Typography variant="h4">Join Us on This Journey</Typography>
      <Typography variant="p">
        We invite you to join us as we continue to grow, innovate, and redefine
        hospitality. PyScript Hotel isn’t just a place to stay, it’s where
        memories are made, connections are fostered, and comfort is redefined.
        Whether it’s your first visit or your hundredth, we aim to make each
        stay even better than the last.
      </Typography>
      <Typography variant="h6">
        Where dreams come true—at PyScript Hotel.
      </Typography>
      <Typography variant="p">
        We look forward to welcoming you soon and sharing our world-class
        hospitality with you. Experience the best life has to offer at a price
        that makes you smile. See you soon at PyScript Hotel, where we’re always
        ready to serve you the best.
      </Typography>
    </Box>
  );
};

export default About;