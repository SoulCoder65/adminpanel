import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import GammelTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
import ReactFC from "react-fusioncharts";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(3),
//     padding: theme.spacing(2),
//     maxHeight: "340",
//     width: "90vw",
//     // margin:"auto"
//     [theme.breakpoints.down("md")]: {
//       width: "80vw",
//     },
//   },
// }));

charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, GammelTheme);

const Usersstats = ({ users, check }) => {
  const labels = [];
  const dataValues = [];

  try {
    if (users.data[0] !== undefined) {
      if (check === "sevendays") {
        Object.keys(users.data[0].sevendays).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(users.data[0].sevendays).map((data, index) => {
          dataValues.push({ value: data });
        });
      } else if (check === "month") {
        Object.keys(users.data[0].currstats).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(users.data[0].currstats).map((data, index) => {
          dataValues.push({ value: data });
        });
      } else if (check === "lst24hrs") {
        Object.keys(users.data[0].last24hrs).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(users.data[0].last24hrs).map((data, index) => {
          dataValues.push({ value: data });
        });
      } else {
        Object.keys(users.data[0].userStats).map((data, index) => {
          labels.push({ label: data });
        });
        Object.values(users.data[0].userStats).map((data, index) => {
          dataValues.push({ value: data });
        });
      }
    }
  } catch (error) {
   }
  const dataSource = {
    chart: {
      caption: "Number Of Registered Users ",
      yaxisname: "Number of Users",
      showhovereffect: "1",
      divLineIsDashed: "1",
      rotateLabels: "1",
      labelDisplay: "wrap",

      drawcrossline: "1",
      // forceYAxisValueDecimals: "0",
      sForceDecimals: "1",

      plottooltext: "<b>$dataValue</b> accounts Registered ",
      theme: "gammel",
    },
    categories: [
      {
        category: labels,
      },
    ],
    dataset: [
      {
        seriesname: "Users",
        data: dataValues,
      },
    ],
  };

 
  return (
    <ReactFusioncharts
      type="msline"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default Usersstats;
