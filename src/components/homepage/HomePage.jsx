import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import TuneIcon from "@mui/icons-material/Tune";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Config";
import { v4 as uuidv4 } from "uuid";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const useStyles = createUseStyles({
  main: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    paddingTop: "10dvh",
    overflow: "hidden",
  },
  header: {
    marginLeft: 15,
    fontSize: 24,
  },

  filterIcon: {
    width: 16,
    height: 16,
    marginLeft: 15,
    color: "#4d4d4d",
    "&:hover": {
      cursor: "pointer",
    },
  },
  filter: {
    color: "#4d4d4d",
    display: "inline-block",
    fontSize: 22,
    marginLeft: 5,
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardsDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    paddingBottom: 100,
  },

  "@media (max-width : 980px)": {},
});

function HomePage({ houses, setHouses, currentLanguage }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const priceGrow = (event) => {
    setHouses(
      houses.sort((a, b) => {
        return a.price - b.price;
      })
    );
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const priceDecrease = (event) => {
    setHouses(
      houses.sort((a, b) => {
        return b.price - a.price;
      })
    );
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  let head;
  let filter;
  let filterItem1;
  let filterItem2;

  if (currentLanguage === "Arm") {
    head = "Վարձով բնակարաններ";
    filter = "Ֆիլտրներ";
    filterItem1 = "Գնի աճման";
    filterItem2 = "Գնի նվազման";
  } else if (currentLanguage === "Rus") {
    head = "Квартиры в аренду";
    filter = "Фильтры";
    filterItem2 = "Цена по убыванию";
    filterItem1 = "Цена по возрастанию";
  } else {
    head = "Apartments for rent";
    filter = "Filters";
    filterItem2 = "Price desc";
    filterItem1 = "Price asc";
  }

  return (
    <>
      <div className={classes.main}>
        <div>
          <h1 className={classes.header}>{head}</h1>
          <div className={classes.filterDiv}>
            <TuneIcon className={classes.filterIcon} onClick={handleToggle} />
            <div
              className={classes.filter}
              onClick={handleToggle}
              ref={anchorRef}
            >
              {filter}
            </div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={priceGrow}>{filterItem1}</MenuItem>
                        <MenuItem onClick={priceDecrease}>
                          {filterItem2}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
        <div className={classes.cardsDiv}>
          <div>
            {houses.map((item) => {
              let num = "" + item.price;
              let str = "";
              if (num.length % 3 === 0) {
                for (let i = 0; i < num.length; i += 3) {
                  str += num[i];
                  str += num[i + 1];
                  str += num[i + 2];
                  str += ",";
                }
              } else if (num.length % 3 === 2) {
                str += num[0];
                str += num[1];
                str += ",";
                for (let i = 2; i < num.length; i += 3) {
                  str += num[i];
                  str += num[i + 1];
                  str += num[i + 2];
                  str += ",";
                }
              } else if (num.length % 3 === 1) {
                str += num[0];
                str += ",";
                for (let i = 1; i < num.length; i += 3) {
                  str += num[i];
                  str += num[i + 1];
                  str += num[i + 2];
                  str += ",";
                }
              }
              return (
                <Card
                  key={uuidv4()}
                  item={item}
                  currentLanguage={currentLanguage}
                  price={str.slice(0, str.length - 1)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
