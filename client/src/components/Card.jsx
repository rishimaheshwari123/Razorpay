import { VStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";

const Card = ({ amount, img, cheoutHandler }) => {
  return (
    <VStack>
      <Image src={img} boxSize={"64"} objectFit="cover" />
      <Text>₹{amount}</Text>
      <Button onClick={() => cheoutHandler(amount)}>Buy now</Button>
    </VStack>
  );
};

export default Card;
