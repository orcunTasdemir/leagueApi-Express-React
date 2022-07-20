import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ItemsDetails = () => {
  const { itemId } = useParams();
  console.log("Here");
  const [item, setItem] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`/lol/allitems/${itemId}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isFetching) {
    return "Loading...";
  }

  return (
    <>
      <div
        className="background"
        style={{
          background: `black`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "4em",
          zIndex: "-1", // this is optional
        }}
      ></div>
      <p>{JSON.stringify(item)}</p>
    </>
  );
};

export default ItemsDetails;
