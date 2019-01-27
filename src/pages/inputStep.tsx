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
    text: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      verticalAlign: "middle"
    },
    rightButton: {
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
      justifyContent: "space-between",
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
    }
  });

interface InputStepProps {
  fileNames: Array<File>;
	postalCode: string,
  handleFileUpdate(files: FileList): void;
  handlePostalUpdate(value: String): void,
  removeItem(index: number): void;
  removeAllItems(): void;
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
    const { fileNames, postalCode, handleFileUpdate, handlePostalUpdate, removeItem, removeAllItems } = this.props;
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
                handleFileUpdate(event.target.files);
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
          <div key={index} className={classes.flexRow}>
            <Typography variant="body2">{item}</Typography>
            <IconButton
              aria-label="Delete"
              onClick={_ => removeItem(index)}
              className={classes.rightButton}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
        {fileNames.length > 0 ? (
          <div className={classes.rightAlign}>
            <Button
              variant="contained"
              color="secondary"
              onClick={_ => removeAllItems()}
              className={classes.inlineButton}
            >
              Delete All
              <DeleteIcon
                className={classNames(classes.iconSmall, classes.rightIcon)}
              />
            </Button>
          </div>
        ) : null}
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
            value={postalCode}
            onChange={event => handlePostalUpdate(event.target.value)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(InputStep);
