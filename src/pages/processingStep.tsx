import * as React from "react";
import classNames from "classnames";
// import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import createStyles from "@material-ui/core/styles/createStyles";
// import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

interface ProcessingStepProps {
	classes: {
		text: string,
	  centerItems: string,
		itemsCol: string,
		button: string,
	  textfield: string
	}
}

const ProcessingStep = (props: ProcessingStepProps) => {
	const time = 20;
	const { classes } = props;
	return (
		<React.Fragment>
		<Typography variant="h6" color="textSecondary" className={classes.text}>
		  {`Estimated time until completion: ${time} seconds`}
		</Typography>
		<div className={classes.centerItems} >
		<div className={classNames(classes.text, classes.itemsCol)}>
		  <Typography variant="h6" color="textSecondary">
		    Bookmark your results:
		  </Typography>
		    <div style={{ display: "flex", alignItems: "center" }}>
		      <Button className={classes.button} variant="contained" color="primary">Copy a web link</Button>
		      <Typography variant="h6" color="textSecondary">or</Typography>
		      <TextField id="email" label="Type in an email" placeholder="john.doe@gmail.com" variant="outlined" margin="dense" className={classes.textfield}>Type in an email</TextField>
		    </div>
		</div>
		</div>
		</React.Fragment>
	)
}

export default ProcessingStep;
