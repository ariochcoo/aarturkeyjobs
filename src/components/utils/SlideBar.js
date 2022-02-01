import React from "react";
import { Carousel } from "react-bootstrap";
import deneme from "./deneme.jpg";
const SlideBar = () => {
  return (
    <Carousel align="center">
      <Carousel.Item>
        <img
          className="d-block w-50"
          src={deneme}
          alt="First slide"
          flex="1"
          width="100%"
          height="50%"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50"
          src={deneme}
          alt="First slide"
          flex="1"
          width="100%"
          height="50%"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50"
          src={deneme}
          alt="First slide"
          flex="1"
          width="100%"
          height="50%"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SlideBar;
