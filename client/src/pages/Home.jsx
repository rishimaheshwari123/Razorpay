import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const checkoutHandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:8080/api/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:8080/api/checkout", {
        amount,
      });

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Rishi Maheshwari",
        description: "Razorpay tutorial",
        image: "https://i.ibb.co/2sjHMdf/rishi-1.jpg",
        order_id: order.id,
        callback_url: "http://localhost:8080/api/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Checkout Error:", error.message);
    }
  };
  return (
    <Box>
      <Stack
        direction={["column", "row"]}
        alignItems="center"
        justifyContent="center"
        h="100vh"
      >
        <Card
          amount={5000}
          img="https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg"
          cheoutHandler={checkoutHandler}
        />
        <Card
          amount={2000}
          img="https://www.reliancedigital.in/medias/Lenovo-IdeaPadSlim-LAptop-493838274-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyNjg4NHxpbWFnZS9qcGVnfGltYWdlcy9oODYvaGMyLzEwMDYwMjIzMjgzMjMwLmpwZ3w1NTk1NTljZDU0YWJiM2FjMzZhMDYxNDc2Y2NkY2NlNTc3NDM2NGJmNWE1YjViMjgyMjRhMjkxY2EyNmFlMTdi"
          cheoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Home;
