import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const useStyles = createUseStyles({
  main: {
    position: "fixed",
    backgroundColor: "#f5f5f5",
    height: "9dvh",
    width: "100%",
    boxShadow: "0px 10px 15px #d9d6d6",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  appName: {
    fontSize: 30,
    paddingTop: "0.5%",
    width: 150,
    marginLeft: 70,
    "&:hover": {
      cursor: "pointer",
    },
  },

  language: {
    fontSize: 20,
    paddingTop: 8,
    marginRight: "2%",
  },
  phone: {
    paddingTop: 9,
    marginLeft: "1.3%",
  },
  flag: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  phoneIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

function Navbar({ currentLanguage, setCurruntLanguage }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [open2, setOpen2] = React.useState(false);
  const anchorRef2 = React.useRef(null);

  const handleNameClick = () => {
    navigate("/");
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleRusClick = (event) => {
    setCurruntLanguage("Rus");
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleEngClick = (event) => {
    setCurruntLanguage("Eng");
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleArmClick = (event) => {
    setCurruntLanguage("Arm");
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
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

  const handleToggle2 = () => {
    setOpen2((prevOpen2) => !prevOpen2);
  };
  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpen2(false);
  };

  function handleListKeyDown2(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen2(false);
    } else if (event.key === "Escape") {
      setOpen2(false);
    }
  }

  const prevOpen2 = React.useRef(open2);
  React.useEffect(() => {
    if (prevOpen2.current === true && open2 === false) {
      anchorRef2.current.focus();
    }

    prevOpen2.current = open;
  }, [open2]);

  let flag;
  let menuItem1;
  let menuItem2;
  if (currentLanguage === "Arm") {
    flag = (
      <img
        src="/img/armenia.png"
        onClick={handleToggle}
        ref={anchorRef}
        className={classes.flag}
      />
    );
    menuItem1 = (
      <MenuItem onClick={handleRusClick}>
        <img src="/img/russia.png" width={16} height={16} />
        <a style={{ marginLeft: 6, fontSize: 15 }}>русский</a>
      </MenuItem>
    );
    menuItem2 = (
      <MenuItem onClick={handleEngClick}>
        <img src="/img/united-states.png" width={16} height={16} />
        <a style={{ marginLeft: 6, fontSize: 15 }}>english</a>
      </MenuItem>
    );
  } else if (currentLanguage === "Rus") {
    flag = (
      <img
        src="/img/russia.png"
        onClick={handleToggle}
        ref={anchorRef}
        className={classes.flag}
      />
    );
    menuItem1 = (
      <MenuItem onClick={handleArmClick}>
        <img src="/img/armenia.png" width={16} height={16} />
        <a style={{ marginLeft: 6, fontSize: 15 }}>հայերեն</a>
      </MenuItem>
    );
    menuItem2 = (
      <MenuItem onClick={handleEngClick}>
        <img src="/img/united-states.png" width={16} height={16} />
        <a style={{ marginLeft: 6, fontSize: 15 }}>english</a>
      </MenuItem>
    );
  } else if (currentLanguage === "Eng") {
    flag = (
      <img
        src="/img/united-states.png"
        onClick={handleToggle}
        ref={anchorRef}
        className={classes.flag}
      />
    );
    menuItem1 = (
      <MenuItem onClick={handleArmClick}>
        <img src="/img/armenia.png" width={16} height={16} />
        <a style={{ marginLeft: 6, fontSize: 15 }}>հայերեն</a>
      </MenuItem>
    );
    menuItem2 = (
      <MenuItem onClick={handleRusClick}>
        <img src="/img/russia.png" width={16} height={16} />
        <a style={{ marginLeft: 6, fontSize: 15 }}>русский</a>
      </MenuItem>
    );
  }

  return (
    <>
      <div className={classes.main}>
        <div className={classes.phone}>
          <LocalPhoneIcon
            style={{ fontSize: 27 }}
            ref={anchorRef2}
            onClick={handleToggle2}
            className={classes.phoneIcon}
          />
          <Popper
            open={open2}
            anchorEl={anchorRef2.current}
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
                  <ClickAwayListener onClickAway={handleClose2}>
                    <MenuList
                      autoFocusItem={open2}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown2}
                      className={classes.menuList}
                    >
                      <MenuItem className={classes.menuItem}>
                        <a>033323737</a>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <div className={classes.appName} onClick={handleNameClick}>
          NAME
        </div>
        <div className={classes.language}>
          {flag}
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
                      {menuItem1}
                      {menuItem2}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </>
  );
}
export default Navbar;
