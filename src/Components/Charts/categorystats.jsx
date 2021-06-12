import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { makeStyles } from "@material-ui/core/styles";
// Resolves charts dependancy
charts(FusionCharts);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    maxHeight: "340",
    width: "90vw",
    [theme.breakpoints.down("md")]: {
      width: "95vw",
    },
  },
}));

const CategoryStats = ({ stats }) => {
  const datavalues = [];
  if (stats.data !== undefined) {
    stats.data.map((dt) => {
      if (dt._id !== null) {
        datavalues.push({ label: dt._id, value: dt.count });
      }
    });
  }

  const dataSource = {
    chart: {
      caption: "Category Wise Registered Businesesses",
      showpercentvalues: "1",
      showvalues: "1",
      showpercentintooltip: "0",
      showpercent: "1",
      showLegend: "0",
      // valueFontSize:"7",
      
      enablemultislicing: "1",
      theme: "candy",

    },
    data: datavalues,
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ReactFusioncharts
        type="pie2d"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </div>
  );
};
export default CategoryStats;
