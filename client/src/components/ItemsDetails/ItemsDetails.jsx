import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const ItemsDetails = () => {
  let data = useLocation();
  console.log(data.state);
  const item = data.state;
  return <p>{JSON.stringify(item)}</p>;
};
// const { itemId } = useParams();
// const [item, setItem] = useState({});
// const [isFetching, setIsFetching] = useState(true);

// useEffect(() => {
//   axios
//     .get(`/lol/allitems/${itemId}`)
//     .then((response) => {
//       console.log({ response });
//       setItem(response.data);
//       setIsFetching(false);
//     })
//     .catch((error) => console.log(error));
// }, [itemId]);

// if (isFetching) {
//   return "Loading...";
// }

//   return (
//     <>
//       <div
//         className="background"
//         style={{
//           background: `black`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           // backgroundAttachment: "fixed",
//           height: "100vh",
//           width: "100vw",
//           position: "fixed",
//           top: "4em",
//           zIndex: "-1", // this is optional
//         }}
//       ></div>
//       {/* <p>{JSON.stringify(item)}</p> */}
//     </>
//   );
// };

export default ItemsDetails;
