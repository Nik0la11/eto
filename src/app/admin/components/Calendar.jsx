"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useClick } from "./Context";

export default function Calendar() {
  const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
  const [events, setEvents] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const { isClicked, setIsClicked } = useClick();

  const handleDateClick = (arg) => {
    setIsClicked(false);
  };

  const handleEventClick = (clickInfo) => {
    alert("Event: " + clickInfo.event.title);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/v1/appointment/get_available_dates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.data) {
          const mappedEvents = json.data.map((slot) => ({
            id: slot.id,
            start: slot.start_time,
            end: new Date(
              new Date(slot.start_time).getTime() + 30 * 60 * 1000
            ).toISOString(),
            extendedProps: {
              user: slot.user,
              isBooked: slot.is_booked,
            },
          }));
          setEvents(mappedEvents);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
    </div>
  );
}
