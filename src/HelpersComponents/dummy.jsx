import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";

import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import { Divider } from "@material-ui/core";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "2px solid white ",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight:"bold",
    textAlign:"center"
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    fontSize: 50,
  },
});

const CardModel = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box
        borderRadius="4%"
        boxShadow={2}
        bgcolor="background.paper"
        m={1}
        p={1}
      >
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                {data.name === "Businesses" ? (
                  <BusinessCenterOutlinedIcon
                    className={classes.icon}
                    style={{ color: data.color }}
                  />
                ) : data.name === "Users" ? (
                  <GroupOutlinedIcon
                    className={classes.icon}
                    style={{ color: data.color }}
                  />
                ) : (
                  <HelpOutlineOutlinedIcon
                    className={classes.icon}
                    style={{ color: data.color }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {data.name}
                </Typography>
                <Typography variant="h4" component="h2" style={{textAlign:"center"}}>
                  150K
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider color="red" />
          <CardActions>
            <IconButton color="grey">
              <EqualizerOutlinedIcon />
              <Typography
                variant="button"
                display="block"
                style={{ margin: "14px", color: "grey" }}
                gutterBottom
              >
                Analyze
              </Typography>
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default CardModel;

// <Typography
// className={classes.title}
// color="textSecondary"
// gutterBottom
// >
// Word of the Day
// </Typography>
// <Typography variant="h5" component="h2">
// be{bull}nev{bull}o{bull}lent
// </Typography>
// <Typography className={classes.pos} color="textSecondary">
// adjective
// </Typography>
// <Typography variant="body2" component="p">
// well meaning and kindly.
// <br />
// {'"a benevolent smile"'}
// </Typography>
