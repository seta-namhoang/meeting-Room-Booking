import "./App.css";
import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  DragDropProvider,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { teal, indigo } from "@material-ui/core/colors";
import { PermDataSetting } from "@material-ui/icons";

const today = new Date();
const times = today.getHours() + ":" + today.getMinutes();
const currentDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const appointments = [
  {
    id: 0,
    title: "US meeting",
    members: [1, 2],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 9, 30),
    endDate: new Date(2017, 4, 28, 12, 0),
  },
  {
    id: 1,
    title: "Oil Painting for Beginners",
    members: [1],
    roomId: 2,
    startDate: new Date(2017, 4, 28, 12, 30),
    endDate: new Date(2017, 4, 28, 14, 30),
  },
];

const owners = [
  {
    text: "Nam",
    id: 1,
    color: indigo,
  },
  {
    text: "Laura",
    id: 2,
    color: teal,
  },
];

const locations = [
  { text: "Room 1", id: 1 },
  { text: "Room 2", id: 2 },
  { text: "Room 3", id: 3 },
];

function App() {
  const [datas, setDatas] = React.useState({
    data: appointments,
    resources: [
      {
        fieldName: "members",
        title: "Members",
        instances: owners,
        allowMultiple: true,
      },
      {
        fieldName: "roomId",
        title: "Location",
        instances: locations,
      },
    ],
    grouping: [
      {
        resourceName: "roomId",
      },
      {
        resourceName: "members",
      },
    ],
  });

  return (
    <div className="App">
      <Paper>
        <Scheduler data={datas.data}>
          <ViewState currentDate={currentDate} />
          <GroupingState grouping={datas.grouping} />
          <DayView startDayHour={8} endDayHour={19} intervalCount={2} />
          <Appointments />
          <Resources data={datas.resources} mainResourceName="members" />
          <IntegratedGrouping />
          <IntegratedEditing />
          <AppointmentTooltip showOpenButton />
          <AppointmentForm />
          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default App;
