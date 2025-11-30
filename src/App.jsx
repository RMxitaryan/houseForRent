import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/homepage/HomePage";
import ItemPage from "./components/card/ItemPage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/Config";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [houses, setHouses] = useState([]);
  const [currentLanguage, setCurruntLanguage] = useState("Arm");

  useEffect(() => {
    const colRef = collection(db, "houses");
    getDocs(colRef)
      .then((snapshot) => {
        let arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        setHouses([...arr]);
      })
      .catch((err) => console.log(err.message));
  }, []);
  console.log(houses);

  return (
    <>
      <Navbar
        currentLanguage={currentLanguage}
        setCurruntLanguage={setCurruntLanguage}
      />
      <Routes>
        <Route
          index
          element={
            <HomePage
              houses={houses}
              setHouses={setHouses}
              currentLanguage={currentLanguage}
            />
          }
        />
        {houses.map((item) => {
          return (
            <Route
              key={uuidv4()}
              path={"item/" + item.number}
              element={
                <ItemPage item={item} currentLanguage={currentLanguage} />
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
