import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Grid, Typography, Divider, useMediaQuery } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    paddingTop: theme.spacing(3)
  },
  item: {
    marginBottom: theme.spacing(1),
    textAlign: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3)
  },
  point: {
    marginBottom: theme.spacing(1.2),
    fontSize: "1.1rem",
    fontStyle: "italic"
  }
}));

const Landing = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));



  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.item}>


          <Divider style={{ marginBottom: "16px" }} />

          <h1>Connected</h1>

        </Grid>
      </Grid>


    </Box>
  );
};

export default Landing;
