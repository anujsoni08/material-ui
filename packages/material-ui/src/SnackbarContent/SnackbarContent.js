import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import { emphasize } from '../styles/colorManipulator';

export const styles = theme => {
  const emphasis = theme.palette.type === 'light' ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);

  return {
    /* Styles applied to the root element. */
    root: {
      ...theme.typography.body2,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 16px',
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        flexGrow: 'initial',
        minWidth: 288,
      },
    },
    /* Styles applied to the message wrapper element. */
    message: {
      padding: '8px 0',
    },
    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 16,
      marginRight: -8,
    },
  };
};

const SnackbarContent = React.forwardRef(function SnackbarContent(props, ref) {
  const { action, classes, className, message, role = 'alert', ...other } = props;

  return (
    <Paper
      role={role}
      square
      elevation={6}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <div className={classes.message}>{message}</div>
      {action ? <div className={classes.action}>{action}</div> : null}
    </Paper>
  );
});

SnackbarContent.propTypes = {
  /**
   * The action to display.
   */
  action: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * The role of the SnackbarContent. If the Snackbar requires focus
   * to be closed, the `alertdialog` role should be used instead.
   */
  role: PropTypes.oneOf(['alert', 'alertdialog']),
};

export default withStyles(styles, { name: 'MuiSnackbarContent' })(SnackbarContent);
