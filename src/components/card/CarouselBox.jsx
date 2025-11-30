import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    justifyContent: "center",
  },
  carouselItem: {
    height: 500,
    width: 830,
  },
  carouselDiv: {
    height: 500,
    width: 830,
  },
  "@media (max-width : 870px)": {
    carouselDiv: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: 500,
    },
    carouselItem: {
      height: 500,
      width: "100%",
    },
  },
  "@media (max-width : 567px)": {
    carouselDiv: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: 280,
    },
    carouselItem: {
      height: 280,
      width: "100%",
    },
  },
  "@media (max-width : 374px)": {
    carouselDiv: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: 250,
    },
    carouselItem: {
      height: 250,
      width: "100%",
    },
  },
});

function CarouselBox({ setOpenDialog, photos }) {
  const classes = useStyles();

  const imgClick = () => {
    setOpenDialog(true);
  };
  return (
    <div className={classes.main}>
      <div className={classes.carouselDiv}>
        <Carousel className={classes.carouselItem}>
          {photos.map((photo) => {
            return (
              <Carousel.Item key={uuidv4()}>
                <img
                  src={photo}
                  className={classes.carouselItem}
                  onClick={imgClick}
                />
              </Carousel.Item>
            );
          })}
          {/* <Carousel.Item>
            <img
              src="/img/house.png"
              className={classes.carouselItem}
              onClick={imgClick}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/img/house2.jpg" className={classes.carouselItem} />
          </Carousel.Item> */}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselBox;
