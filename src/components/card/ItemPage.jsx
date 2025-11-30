import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import CarouselBox from "./CarouselBox";
import Dialog from "@mui/material/Dialog";
import PhotoDialog from "./PhotoDialog";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

const useStyles = createUseStyles({
  page: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    paddingTop: "15dvh",
    display: "flex",
    justifyContent: "center",
  },
  main: {
    backgroundColor: "white",
    marginBottom: 50,
    paddingBottom: 130,
    width: 830,
    boxShadow: "0px 1px 10px #d9d6d6",
  },
  dialog: {
    width: "100%",
    height: "100dvh",
    backgroundColor: "black",
  },
  houseInfo: {
    fontSize: 22,
  },
  houseInfoDiv: {
    paddingTop: 8,
    paddingLeft: 15,
  },
  price: {
    fontSize: 23,
    marginTop: 8,
  },
  aboutBuilding: {
    marginTop: 25,
  },

  "@media (max-width : 567px)": {
    houseInfo: {
      fontSize: 20,
    },
  },
  "@media (max-width : 374px)": {
    houseInfo: {
      fontSize: 16,
    },
  },
});

function ItemPage({ item, currentLanguage }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  let num = "" + item.price;
  let price = "";
  if (num.length % 3 === 0) {
    for (let i = 0; i < num.length; i += 3) {
      price += num[i];
      price += num[i + 1];
      price += num[i + 2];
      price += ",";
    }
  } else if (num.length % 3 === 2) {
    price += num[0];
    price += num[1];
    price += ",";
    for (let i = 2; i < num.length; i += 3) {
      price += num[i];
      price += num[i + 1];
      price += num[i + 2];
      price += ",";
    }
  } else if (num.length % 3 === 1) {
    price += num[0];
    price += ",";
    for (let i = 1; i < num.length; i += 3) {
      price += num[i];
      price += num[i + 1];
      price += num[i + 2];
      price += ",";
    }
  }

  let photos = item.photos;
  let mainInfo;
  let adress;
  let info;
  let description;
  let descriptionPar;
  let priceValue;
  if (currentLanguage === "Arm") {
    mainInfo = item.mainInfo;
    adress = item.adress;
    priceValue = "ամսական";
    info = item.info;
    description = item.description;
    descriptionPar = "Նկարագիր";
  } else if (currentLanguage === "Rus") {
    mainInfo = item.mainInfoRus;
    adress = item.adressRus;
    priceValue = "в месяц";
    info = item.infoRus;
    description = item.descriptionRus;
    descriptionPar = "Описание";
  } else {
    mainInfo = item.mainInfoEng;
    adress = item.adressEng;
    priceValue = "monthly";
    info = item.infoEng;
    description = item.descriptionEng;
    descriptionPar = "Description";
  }

  let infoParagraph;
  if (info) {
    infoParagraph = Object.keys(info);
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className={classes.page}>
        <div className={classes.main}>
          <CarouselBox setOpenDialog={setOpenDialog} photos={photos} />
          <div className={classes.houseInfoDiv}>
            <h1 className={classes.houseInfo}>{mainInfo}</h1>
            <div>
              <RoomIcon
                style={{
                  fontSize: 20,
                  color: "grey",
                }}
              />
              {console.log(item)}
              <a style={{ color: "grey" }}>{adress[0]}</a>

              <a style={{ fontSize: 20, color: "grey" }}>{" › "}</a>
              <a style={{ color: "grey" }}>{adress[1]}</a>
            </div>
            <h2 className={classes.price}>
              {price.slice(0, price.length - 1)} ֏ {priceValue}
            </h2>
            {info ? (
              <>
                {infoParagraph.map((parName) => {
                  let arr = [];
                  for (let key in info[parName]) {
                    arr.push({
                      key1: key,
                      key2: info[parName][key],
                    });
                  }
                  return (
                    <div className={classes.aboutBuilding} key={uuidv4()}>
                      <h2 style={{ fontSize: 23 }}>{parName}</h2>
                      {arr.map((item) => {
                        return (
                          <div
                            style={{ display: "flex", marginBottom: 5 }}
                            key={uuidv4()}
                          >
                            <div
                              style={{
                                width: 180,
                                marginRight: 20,
                                color: "grey",
                                fontSize: 17,
                              }}
                            >
                              {item.key1}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: 17,
                              }}
                            >
                              {item.key2}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            ) : null}
            {description ? (
              <div className={classes.aboutBuilding}>
                <h2 style={{ fontSize: 23 }}>{descriptionPar}</h2>
                <div>{description}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <React.Fragment>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <PhotoDialog photos={photos} />
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default ItemPage;
