import "./App.css";
import * as React from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { teal, orange, red } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
import classNames from "clsx";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  DayView,
  ViewSwitcher,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

function App() {
  return <div className="App"></div>;
}

export default App;
