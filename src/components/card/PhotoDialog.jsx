import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";

const useStyles = createUseStyles({
  carouselItem: {
    height: 400,
    width: 600,
  },
  "@media (max-width : 830px)": {
    carouselItem: {
      height: 500,
      width: "100%",
    },
  },
  "@media (max-width : 567px)": {
    carouselItem: {
      height: 280,
      width: 420,
    },
  },
  "@media (max-width : 484px)": {
    carouselItem: {
      height: 280,
      width: 350,
    },
  },
  "@media (max-width : 415px)": {
    carouselItem: {
      height: 260,
      width: "100%",
    },
  },
});

function PhotoDialog({ setOpenDialog, photos }) {
  const classes = useStyles();

  return (
    <Carousel className={classes.carouselItem}>
      {photos.map((photo) => {
        return (
          <Carousel.Item key={uuidv4()}>
            <img src={photo} className={classes.carouselItem} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default PhotoDialog;
