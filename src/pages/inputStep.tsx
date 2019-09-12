import * as React from "react";
import classNames from "classnames";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit * 0.5
    },
    inlineButton: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    dense: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      alignItems: "center"
    },
    rightAlign: {
      display: "flex",
      justifyContent: "flex-end"
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    },
    text: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      verticalAlign: "middle"
    }
  });

const fileListToArray = (files: FileList) => {
  var fileArray: Array<File> = [];
  for (let i = 0; i < files.length; i++) {
    fileArray.push(files[i]);
  }

  return fileArray;
};

interface FileInputSectionProps {
  classes: {
    container: string;
    text: string;
    dense: string;
    rightAlign: string;
    flexRow: string;
  };
  htmlKey: string;
  title: string;
  fileUpdateHandler(file: Array<File>): void;
  fileList: Array<File>;
}

const FileInputSection = (props: FileInputSectionProps) => {
  const { classes, title, fileUpdateHandler, fileList, htmlKey } = props;

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h6" color="textSecondary" className={classes.text}>
          {title}
        </Typography>
        <input
          id={htmlKey}
          type="file"
          style={{ display: "none" }}
          onChange={event => {
            if (event.target.files !== null) {
              fileUpdateHandler(fileListToArray(event.target.files));
            }
          }}
        />
        <label htmlFor={htmlKey}>
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
      <div className={classes.rightAlign}>
        {fileList.map((item, index) => (
          <div key={index} className={classes.flexRow}>
            <Typography variant="body2">{item.name}</Typography>
          </div>
        ))}
      </div>
    </>
  );
};

interface IntervalSectionProps {
  handleIntervalChange(interval: string): void;
}

const IntervalSection = (props: IntervalSectionProps) => {
  const { handleIntervalChange } = props;
  return (
    <>
      <TextField
        label="Interval"
        type="number"
        onChange={event => handleIntervalChange(event.target.value)}
      />
    </>
  );
};

interface InputStepProps {
  handleLoadTraceFileUpdate(file: Array<File>): void;
  handleSolarTraceFileUpdate(file: Array<File>): void;
  handleLoadTraceIntervalUpdate(value: string): void;
  handleSolarTraceIntervalUpdate(value: string): void;
  loadTraceFiles: Array<File>;
  solarTraceFiles: Array<File>;
}

class InputStep extends React.Component<
  InputStepProps & WithStyles<typeof styles>,
  {}
> {
  private fileInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.fileInput = React.createRef();
  }

  render() {
    const { classes } = this.props;
    const {
      handleLoadTraceFileUpdate,
      handleSolarTraceFileUpdate,
      handleLoadTraceIntervalUpdate,
      handleSolarTraceIntervalUpdate,
      loadTraceFiles,
      solarTraceFiles
    } = this.props;
    return (
      <>
        <FileInputSection
          htmlKey="load trace"
          classes={classes}
          title="Upload a Load Trace File"
          fileUpdateHandler={handleLoadTraceFileUpdate}
          fileList={loadTraceFiles}
        />
        <IntervalSection handleIntervalChange={handleLoadTraceIntervalUpdate} />
        <FileInputSection
          htmlKey="solar trace"
          classes={classes}
          title="Upload a Solar Trace File"
          fileUpdateHandler={handleSolarTraceFileUpdate}
          fileList={solarTraceFiles}
        />
        <IntervalSection
          handleIntervalChange={handleSolarTraceIntervalUpdate}
        />
      </>
    );
  }
}

export default withStyles(styles)(InputStep);
