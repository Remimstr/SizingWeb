import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputStep from "./inputStep";
import ProcessingStep from "./processingStep";

interface StepFlowButtonsProps {
  classes: {
    button: string;
		leftButton: string;
  };
  renderNext: boolean;
  renderBack: boolean;
  disabledNext: boolean;
  disabledBack: boolean;
  handleNext: () => void;
  handleBack: () => void;
}

const StepFlowButtons = (props: StepFlowButtonsProps) => {
  const {
    classes,
    renderNext,
    renderBack,
    disabledNext,
    disabledBack,
    handleNext,
    handleBack
  } = props;
  return (
    <div>
      {renderBack ? (
        <Button
          disabled={disabledBack}
          className={classes.leftButton}
          onClick={handleBack}
        >
          Back
        </Button>
      ) : null}
      {renderNext ? (
        <Button
          disabled={disabledNext}
          className={renderBack ? classes.button : classes.leftButton }
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      ) : null}
    </div>
  );
};

StepFlowButtons.defaultProps = {
  renderNext: true,
  renderBack: true,
  disabledNext: false,
  disabledBack: false,
  handleNext: () => null,
  handleBack: () => null
};

const styles = (theme: Theme) =>
  createStyles({
    text: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      verticalAlign: "middle"
    },
		section: {
			marginTop: theme.spacing.unit * 5,
			marginBottom: theme.spacing.unit * 5
		},
		centerItems: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			textAlign: "center"
		},
		itemsCol: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
    },
		leftButton: {
			marginTop: theme.spacing.unit,
			marginBottom: theme.spacing.unit,
		  marginRight: theme.spacing.unit
		},
    button: {
      margin: theme.spacing.unit
    },
		textfield: {
			marginLeft: theme.spacing.unit,
			marginRight: theme.spacing.unit
		}
    
  });

type State = {
  activeStep: number;
  fileList: Array<File>;
  fileNames: Array<String>;
  postalCode: String | null;
};

class Steps extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    activeStep: 1,
    fileList: [],
    fileNames: [],
    postalCode: null
  };

  handleFileUpdate = (files: FileList) => {
    var fileList: Array<File> = this.state.fileList;
    var fileNames: Array<String> = this.state.fileNames;
    for (let i = 0; i < files.length; i++) {
      fileList.push(files[i]);
      fileNames.push(files[i].name);
    }
    this.setState(state => ({
      ...this.state,
      fileList: fileList,
      fileNames: fileNames
    }));
  };

  handlePostalUpdate = (value: String) => {
    if (value !== "") {
      this.setState(state => ({
        ...this.state,
        postalCode: value
      }));
    } else {
      this.setState(state => ({
        ...this.state,
        postalCode: null
      }));
    }
  };

  removeItem = (index: Number) => {
    this.setState(state => ({
      ...this.state,
      fileList: this.state.fileList.filter((_, i) => i !== index),
      fileNames: this.state.fileNames.filter((_, i) => i !== index)
    }));
  };

  removeAllItems = () => {
    this.setState(state => ({
      ...this.state,
      fileList: [],
      fileNames: []
    }));
  };

  canProceed = (index: Number) => {
    const { fileList, fileNames, postalCode } = this.state;
    switch (index) {
      case 0:
        return fileList.length !== 0 &&
          fileNames.length !== 0 &&
          postalCode !== null
          ? true
          : false;
      default:
        return false;
    }
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
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep, postalCode, fileNames } = this.state;

    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={0}>
          <StepLabel>
            <Typography variant="h5">Input:</Typography>
          </StepLabel>
          <StepContent>
            <div className={classes.section} >
            <InputStep
              classes={classes}
              fileNames={fileNames}
              postalCode={postalCode == null ? "" : postalCode}
              handleFileUpdate={this.handleFileUpdate}
              handlePostalUpdate={this.handlePostalUpdate}
              removeItem={this.removeItem}
              removeAllItems={this.removeAllItems}
            />
            </div>

            <StepFlowButtons
              classes={classes}
              renderBack={false}
              disabledNext={!this.canProceed(0)}
              handleNext={this.handleNext}
            />
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>
            <Typography variant="h5">Processing:</Typography>
          </StepLabel>
          <StepContent>
            <div className={classes.section} >
              <ProcessingStep classes={classes}/>
            </div>
            <StepFlowButtons
              classes={classes}
              handleNext={this.handleNext}
              handleBack={this.handleBack}
            />
          </StepContent>
        </Step>
        <Step key={2}>
          <StepLabel>
            <Typography variant="h5">Results:</Typography>
          </StepLabel>
          <StepContent>
            <StepFlowButtons
              classes={classes}
              renderNext={false}
              handleBack={this.handleBack}
            />
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

export default withStyles(styles)(Steps);
