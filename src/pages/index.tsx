import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import withRoot from "../withRoot";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Steps from "./steps";

const content = {
  title: "Sizing Web",
  blurb: (
    <span>
      Calculate your solar panel needs <br />
      Tell us your monthly electricity usage and location and we'll tell you
      what size of a solar panel array you need to power your home!
    </span>
  )
};

const styles = (theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    appBar: {
      position: "relative"
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    blurbArea: {
      backgroundColor: theme.palette.background.paper
    },
    blurbContent: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    app: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    footer: {
      marginTop: theme.spacing.unit,
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit * 1}px 0`
    }
  });

class Index extends React.Component<WithStyles<typeof styles>, {}> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <div>
          <AppBar position="static" className={classes.appBar}>
            <ToolBar>
              <Typography variant="h6" gutterBottom color="inherit">
                {content.title}
              </Typography>
            </ToolBar>
          </AppBar>

          <main className={classes.layout}>
            <div className={classes.blurbArea}>
              <div className={classes.blurbContent}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {content.title}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  {content.blurb}
                </Typography>
              </div>
            </div>
            <Steps />
          </main>
        </div>
        <footer className={classNames(classes.footer, classes.layout)}>
          <Typography variant="h5" align="center">
            Provided by the University of Waterloo
          </Typography>
        </footer>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
