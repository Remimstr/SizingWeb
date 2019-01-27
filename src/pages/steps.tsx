import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const styles = (theme: Theme) =>
  createStyles({
    text: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      verticalAlign: "middle"
    },
		button: {
			marginTop: theme.spacing.unit
		},
    dense: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    }
  });

type InputSectionState = {
  fileList: FileList | null;
  fileNames: Array<string>;
};

class InputSection extends React.Component<
  WithStyles<typeof styles>,
  InputSectionState
> {
  private fileInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.fileInput = React.createRef();
  }
  state = {
    fileList: null,
    fileNames: []
  };

  handleChange = (files: FileList) => {
    var fileNames: Array<string> = [];
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
    }
    console.log(fileNames);
    this.setState(state => ({ fileList: files, fileNames: fileNames }));
  };

  render() {
    const { classes } = this.props;
    const { fileNames } = this.state;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <Typography variant="body1" className={classes.text}>
            a) Your electricity usage for at least one month
          </Typography>
          <input
            id="rbf"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={event => {
              if (event.target.files !== null) {
                this.handleChange(event.target.files);
              }
            }}
          />
          <label htmlFor="rbf">
            <Button
              variant="outlined"
              size="large"
              className={classes.dense}
              component="span"
            >
              Upload
            </Button>
          </label>
        </div>
        {fileNames.map((item, index) => (
          <Typography variant="body2" key={index}>
            {item}
          </Typography>
        ))}
        <div className={classes.container}>
          <Typography variant="body1" className={classes.text}>
            b) Your postal code
          </Typography>
          <TextField
            required
            id="postal-code"
            label="Postal Code"
            placeholder="A1B 2C3"
            className={classes.dense}
            variant="outlined"
            margin="dense"
          />
        </div>
      </React.Fragment>
    );
  }
}

type State = {
  activeStep: number;
};

class Steps extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
  	if (this.state.activeStep > 0) {
			this.setState(state => ({
				activeStep: state.activeStep - 1
			}));
			};
	}


  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={0}>
          <StepLabel>
            <Typography variant="h5">Input:</Typography>
          </StepLabel>
          <StepContent>
            <InputSection classes={classes} />
            <Button className={classes.button} variant="contained" color="primary" onClick={this.handleNext}>Next</Button>
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>
            <Typography variant="h5">Processing:</Typography>
          </StepLabel>
          <StepContent>
            <div>In progress</div>
            <div>
              <Button className={classes.button} onClick={this.handleBack}>Back</Button>
              <Button className={classes.button} variant="contained" color="primary" onClick={this.handleNext}>Next</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={2}>
          <StepLabel>
            <Typography variant="h5">Results:</Typography>
          </StepLabel>
        </Step>
      </Stepper>
    );
  }
}

export default withStyles(styles)(Steps);
