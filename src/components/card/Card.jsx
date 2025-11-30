import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  main: {
    width: 700,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "white",
    display: "flex",
    padding: 15,
    marginTop: 3,
    cursor: "pointer",
  },
  cardImgDiv: {
    paddingRight: 10,
  },
  cardInfo: {
    paddingLeft: 8,
  },
  housePhoto: {
    width: 190,
    height: 142,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "white",
    transition: "transform .3s ease,opacity .3s,-webkit-transform .3s ease",
    "&:hover": {
      transform: "scale(1.08)",
    },
  },
  houseInfo: {
    fontSize: 16.5,
  },
  price: {
    color: "rgb(51, 51, 51)",
    fontSize: 22,
    marginTop: 5,
  },
  adress: {
    fontSize: 15,
  },
  "@media (max-width : 740px)": {
    main: {
      width: "auto",
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "white",
      display: "flex",
      padding: 15,
      marginTop: 3,
      cursor: "pointer",
    },
    housePhoto: {
      width: 120,
      height: 90,
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "white",
    },
    houseInfo: {
      fontSize: 15,
    },
  },
  "@media (max-width : 425px)": {
    main: {
      width: "auto",
      backgroundColor: "#ffffff",
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "white",
      display: "flex",
      padding: 5,
      marginTop: 3,
    },
  },
});

function Card({ item, currentLanguage, price }) {
  const classes = useStyles();
  const navigate = useNavigate();

  let mainPhoto = item.mainPhoto;
  let number = item.number;
  let mainInfo;
  let mainAdress;
  let priceValue;
  if (currentLanguage === "Arm") {
    mainInfo = item.mainInfo;
    mainAdress = item.mainAdress;
    priceValue = "ամսական";
  } else if (currentLanguage === "Rus") {
    mainInfo = item.mainInfoRus;
    mainAdress = item.mainAdressRus;
    priceValue = "в месяц";
  } else {
    mainInfo = item.mainInfoEng;
    mainAdress = item.mainAdressEng;
    priceValue = "monthly";
  }

  return (
    <>
      <div
        className={classes.main}
        onClick={() => {
          navigate("item/" + number);
        }}
      >
        <div className={classes.cardImgDiv}>
          <img src={mainPhoto} className={classes.housePhoto} />
        </div>
        <div className={classes.cardInfo}>
          <div className={classes.houseInfo}>{mainInfo}</div>
          <h3 className={classes.price}>
            {price} ֏ {priceValue}
          </h3>
          <p className={classes.adress}>{mainAdress}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
