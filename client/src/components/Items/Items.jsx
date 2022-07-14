import React, { useState, useEffect } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import { InputAdornment } from "@mui/material";

const Items = () => {
  const [allItems, setAllItems] = useState({ allItems: [] });
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get("/lol/allitems")
      .then((response) => {
        setAllItems(response.data);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isFetching) return "Loading...";
  //   console.log(allItems);

  const itemsArray = Object.entries(allItems).sort(([, first], [, second]) => {
    // console.log(first.gold.total);
    return first.gold.total - second.gold.total;
  });

  // console.log(itemsArray);
  return (
    <div style={{ background: "black" }}>
      <h1>League of Legends Items</h1>

      {itemsArray && (
        <ImageList
          cols={6}
          sx={{ margin: "auto", width: "80%", height: "auto" }}
          rowHeight="auto"
        >
          {itemsArray.map(([key, item]) => (
            <ImageListItem key={key}>
              <Link
                to={`/allitems/${key}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${key}.png`}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  subtitle={
                    <>
                      <GiTwoCoins />
                      <span style={{ paddingLeft: ".5em" }}>
                        {item.gold.total}
                      </span>
                    </>
                  }
                  position="below"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default Items;
