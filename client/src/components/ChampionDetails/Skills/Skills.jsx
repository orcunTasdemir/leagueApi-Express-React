import React from "react";
import { Box, Typography } from "@mui/material";

const Skills = ({ spells }) => {
  const tooltipString = (tooltip, effectBurn) => {
    const effectsDict = {};
    console.log({ effectBurn });
    // establish dictionary
    effectBurn.map((effect, key) => (effectsDict[`{{ e${key} }}`] = effect));
    console.log({ effectsDict });
    // // create the regexp
    const regexp = RegExp("(" + Object.keys(effectsDict).join("|") + ")", "g");
    // console.log(regexp);

    tooltip = tooltip.replace(regexp, function (word) {
      console.log(effectsDict[word]);
      return effectsDict[word] | word;
    });

    // console.log(retString);

    return tooltip;
  };

  return (
    <Box sx={{ marginTop: "2em" }}>
      <Typography variant="h5">Skills</Typography>
      <Box>
        <table>
          <tbody>
            {spells.map(({ id, name, tooltip, effectBurn }) => (
              <>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/${id}.png`}
                  alt={`Champion spell named: ${name}`}
                ></img>
                <tr>
                  <Typography variant="h6">{name}</Typography>

                  {/* <p>{tooltip}</p> */}
                  <td>{tooltipString(tooltip, effectBurn)}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Skills;
