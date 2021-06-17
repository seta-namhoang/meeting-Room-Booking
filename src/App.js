import React, { useState, useEffect, useCallback } from "react";
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
  GroupingPanel,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";

import { blue, red, teal } from "@material-ui/core/colors";

export default function App() {
  let today = new Date();
  const [currentDate, setCurrentDate] = useState(
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
  );

  const owners = [
    {
      text: "Nam",
      id: 1,
    },
    {
      text: "Laura",
      id: 2,
    },
  ];
  const resources = [
    {
      fieldName: "roomId",
      title: "Location",
      instances: [
        {
          text: "Room I",
          id: 1,
          color: blue,
        },
        {
          text: "Room II",
          id: 2,
          color: teal,
        },
        {
          text: "Room III",
          id: 3,
          color: red,
        },
      ],
    },
    {
      fieldName: "members",
      title: "Member(s)",
      instances: owners,
    },
  ];
  const grouping = [
    {
      resourceName: "roomId",
    },
  ];

  const [appointmentData, setAppointments] = useState([]);

  const commitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          appointmentData.length > 0
            ? appointmentData[appointmentData.length - 1].id + 1
            : 0;
        setAppointments([
          ...appointmentData,
          { id: startingAddedId, ...added },
        ]);
      }
      if (changed) {
        setAppointments(
          appointmentData.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setAppointments(
          appointmentData.filter((appointment) => appointment.id !== deleted)
        );
      }
    },
    [setAppointments, appointmentData]
  );

  useEffect(() => {
    const apm = localStorage.getItem("appointments");
    if (apm) {
      setAppointments(JSON.parse(apm));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointmentData));
  }, [appointmentData]);

  let currentDateChange = (currentDate) => setCurrentDate(currentDate);
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
          <IntegratedEditing />
          <ConfirmationDialog />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <GroupingPanel />
          <DragDropProvider />
          <CurrentTimeIndicator />
        </Scheduler>
      </Paper>
    </>
  );
}
