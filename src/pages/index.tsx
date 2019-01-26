import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import withRoot from "../withRoot";
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
    appBar: {
      position: "relative"
    },
    blurbArea: {
      backgroundColor: theme.palette.background.paper
    },
    blurbContent: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    }
  });

class Index extends React.Component<WithStyles<typeof styles>, {}> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar position="static" className={classes.appBar}>
          <ToolBar>
            <Typography variant="h6" gutterBottom color="inherit">
              {content.title}
            </Typography>
          </ToolBar>
        </AppBar>

        <main>
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
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
