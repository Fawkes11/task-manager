/**********************
    Name: Main.tsx
 
    Description: This is the main layout for organizing
    the application

 **********************/

import { Container } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Main = (props: Props) => {
  return (
    <Container
      mt={{ base: "10px", sm: "40px" }}
      maxW="container.md"
      pt={14}
    >
      {props.children}
    </Container>
  );
};

export default Main;
