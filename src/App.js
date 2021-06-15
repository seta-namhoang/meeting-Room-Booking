import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  GroupingState,
  IntegratedGrouping,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  CurrentTimeIndicator,
  DateNavigator,
  TodayButton,
  Resources,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./appoinments";
import { indigo, teal } from "@material-ui/core/colors";

export default function App() {
  let today = new Date();
  const [currentDate, setCurrentDate] = React.useState(
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );

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
    {
      text: "Room I",
      id: 1,
    },
    {
      text: "Room II",
      id: 2,
    },
    {
      text: "Room III",
      id: 3,
    },
  ];

  const [appointmentData, setAppointments] = React.useState(appointments);
  const commitChanges = ({ added, changed, deleted }) => {
    let data = [...appointmentData];
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      data = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      data = data.filter((appointment) => appointment.id !== deleted);
    }
    setAppointments(data);
  };

  const resources = [
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
  ];
  const grouping = [
    {
      resourceName: "roomId",
    },
  ];
  let currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };
  console.log(appointmentData);
  return (
    <>
      <Paper>
        <Scheduler data={appointmentData} height={660}>
          <ViewState
            currentDate={currentDate}
            defaultCurrentViewName="Week"
            onCurrentDateChange={currentDateChange}
          />
          <EditingState onCommitChanges={commitChanges} />
          <GroupingState grouping={grouping} />
          <IntegratedEditing />
          <ConfirmationDialog />
          <WeekView excludedDays={[0, 6]} startDayHour={8} endDayHour={19} />
          <DayView startDayHour={8} endDayHour={19} />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <Resources data={resources} mainResourceName="roomId" />
          <IntegratedGrouping />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <DragDropProvider />
          <CurrentTimeIndicator />
        </Scheduler>
      </Paper>
    </>
  );
}
