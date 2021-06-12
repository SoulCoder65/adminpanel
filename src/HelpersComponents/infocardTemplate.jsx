import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Divider, Avatar, Button, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, yellow } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YelllowRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "90%",
  },
}));

const InfoCard = (props) => {
  const {
    _id,
    businessname,
    contactpersonanme,
    phone,
    title,
    description,
    status,
    email,
    profilepic,
    updateStatus,
  } = props.props.data;
  const { dialog } = props;
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(status);

  const submitRequest = () => {
    updateStatus(_id, selectedValue);
    dialog.close(true);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase>
              <Avatar
                variant="square"
                alt="not-found"
                src={profilepic}
                className={classes.image}
              >
                {businessname[0]!==null?businessname[0]:"NA"}
              </Avatar>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <GridTemplater title="Business" name={businessname} />
                <Divider/>
                <GridTemplater
                  title="Name"
                  name={contactpersonanme}
                />
                 <Divider/>
               
                <GridTemplater title="Phone" name={phone} />
                <Divider/>
               
                {email ? <GridTemplater title="Email" name={email} /> : null}
                <Divider variant="fullWidth" />
                <Divider/>
               
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography gutterBottom variant="subtitle1">
              Subject
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ marginLeft: "16%" }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography gutterBottom variant="subtitle1">
              Description
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Container
              style={{
                maxHeight: "130px",
                overflow: "auto",
                paddingLeft: "0px",
                marginTop: "2%",
                marginLeft: "12%",
              }}
            >
              <Typography variant="body2">
                {description}
              </Typography>
            </Container>
          </Grid>
        </Grid>
        <div>
          <Grid
            container
            style={{ width: "100%", marginTop: "2%" }}
            spacing={2}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1">
                Pending
              </Typography>
              <YelllowRadio
                checked={selectedValue === "Pending"}
                onChange={handleChange}
                value="Pending"
                name="radio-button-demo"
                inputProps={{ "aria-label": "Pending" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1">
                Invalid
              </Typography>
              <Radio
                checked={selectedValue === "Invalid"}
                onChange={handleChange}
                value="Invalid"
                name="radio-button-demo"
                inputProps={{ "aria-label": "Invalid" }}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1">
                Solved
              </Typography>
              <GreenRadio
                checked={selectedValue === "Solved"}
                onChange={handleChange}
                value="Solved"
                name="radio-button-demo"
                inputProps={{ "aria-label": "Solved" }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "29%" }}
                onClick={submitRequest}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
export default InfoCard;

const GridTemplater = ({ title, name }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Typography gutterBottom variant="subtitle1">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography gutterBottom variant="subtitle1">
          <b>{name}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};
