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
import uploadRequest from "./request";

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
          className={renderBack ? classes.button : classes.leftButton}
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
      justifyContent: "center"
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

export type State = {
  activeStep: number;
  loadTrace: {
    files: Array<File>;
    interval: string;
  };
  solarTrace: {
    files: Array<File>;
    interval: string;
  };
  costs: {
    panel: number;
    battery: number;
  };
  performanceTarget: {
    percentLoad: number;
  };
};

class Steps extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    activeStep: 0,
    loadTrace: {
      files: [],
      interval: ""
    },
    solarTrace: {
      files: [],
      interval: ""
    },
    costs: {
      panel: 2000,
      battery: 800
    },
    performanceTarget: {
      percentLoad: 1
    }
  };

  handleLoadTraceFileUpdate = (files: Array<File>) => {
    this.setState(state => ({
      loadTrace: {
        ...state.loadTrace,
        files
      }
    }));
  };

  handleLoadTraceIntervalUpdate = (interval: string) => {
    this.setState(state => ({
      loadTrace: {
        ...state.loadTrace,
        interval
      }
    }));
  };

  handleSolarTraceFileUpdate = (files: Array<File>) => {
    this.setState(state => ({
      solarTrace: {
        ...state.solarTrace,
        files
      }
    }));
  };

  handleSolarTraceIntervalUpdate = (interval: string) => {
    this.setState(state => ({
      solarTrace: {
        ...state.solarTrace,
        interval
      }
    }));
  };

  handleNext = () => {
    if (this.state.activeStep === 0) {
      uploadRequest(this.state);
    }
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
    const {
      activeStep,
      loadTrace: { files: loadTraceFiles },
      solarTrace: { files: solarTraceFiles }
    } = this.state;

    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={0}>
          <StepLabel>
            <Typography variant="h5">Input:</Typography>
          </StepLabel>
          <StepContent>
            <div className={classes.section}>
              <InputStep
                handleLoadTraceFileUpdate={this.handleLoadTraceFileUpdate}
                handleSolarTraceFileUpdate={this.handleSolarTraceFileUpdate}
                handleLoadTraceIntervalUpdate={
                  this.handleLoadTraceIntervalUpdate
                }
                handleSolarTraceIntervalUpdate={
                  this.handleSolarTraceIntervalUpdate
                }
                loadTraceFiles={loadTraceFiles}
                solarTraceFiles={solarTraceFiles}
              />
            </div>

            <StepFlowButtons
              classes={classes}
              renderBack={false}
              handleNext={this.handleNext}
            />
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>
            <Typography variant="h5">Processing:</Typography>
          </StepLabel>
          <StepContent>
            <div className={classes.section}>
              <ProcessingStep classes={classes} />
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
