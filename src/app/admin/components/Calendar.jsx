"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useClick } from "./Context";
import { useDate } from "./Context";
import srLatinLocale from "../sr-latin";
import { useRef } from "react";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const lastFetchedDate = useRef(null);
  const lastFetchedDay = useRef(null);
  const lastViewType = useRef(null);
  const [day, setDay] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const { isClicked, setIsClicked } = useClick();
  const { date, setDate } = useDate();
  const [token, setToken] = useState();
  const calendarRef = useRef(null);
  const [readyToFetch, setReadyToFetch] = useState(false);

  const handleDateClick = (arg) => {
    console.log(arg);
    setIsClicked(false);
    setDate(arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    alert("Event: " + clickInfo.event.title);
  };

  const fetchEvents = (formattedDate) => {
    if (!token) return;
    fetch(`${BASE_URL}/v1/admin/get_calendar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formattedDate }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.data) {
          const mappedEvents = json.data.map((slot) => ({
            start: slot.start_time,
            end: new Date(
              new Date(slot.start_time).getTime() + 30 * 60 * 1000
            ).toISOString(),
            allDay: true,
            title: `${slot.booked_slots} zakazanih`,
          }));
          setEvents(mappedEvents);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => console.error("Error fetching data: ", err));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token && calendarRef.current) {
      setReadyToFetch(true);
    }
  }, [token, calendarRef.current]);

  useEffect(() => {
    if (!token || !calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    const currentStart = calendarApi.view.currentStart
      .toISOString()
      .slice(0, 10);

    if (lastFetchedDate.current !== currentStart) {
      lastFetchedDate.current = currentStart;
      fetchEvents(currentStart);
    }
  }, [token]);

  useEffect(() => {
    if (!readyToFetch) return;
    const calendarApi = calendarRef.current.getApi();
    const currentStart = calendarApi.view.currentStart
      .toISOString()
      .slice(0, 10);
    lastFetchedDate.current = currentStart;
    fetchEvents(currentStart);
  }, [readyToFetch]);

  useEffect(() => {
    if (!day) return;
    fetch(`${BASE_URL}/v1/admin/get_booked_dates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.data) {
          const mappedEvents = json.data.map((slot) => ({
            start: slot.start_time,
            end: new Date(
              new Date(slot.start_time).getTime() + 30 * 60 * 1000
            ).toISOString(),
          }));
          setEvents(mappedEvents);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, [day]);

  return (
    <div className="h-full w-full overflow-hidden">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        height="100%"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locales={[srLatinLocale]}
        locale="sr-Latn"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
        datesSet={(arg) => {
          const viewStart = arg.start.toISOString().slice(0, 10);
          const viewType = arg.view.type;

          if (viewType === "dayGridMonth" || viewType === "timeGridWeek") {
            setDay(null);
            lastFetchedDay.current = null;
            if (lastFetchedDate.current === viewStart) {
              return;
            } else {
              lastFetchedDate.current = viewStart;
              fetchEvents(viewStart);
            }
          } else if (viewType === "timeGridDay" || viewType === "dayGridDay") {
            const currentDayStr = arg.start.toLocaleDateString("sv-SE");
            lastFetchedDate.current = null;
            console.log(currentDayStr);

            if (lastFetchedDay.current === currentDayStr) return;
            lastFetchedDay.current = currentDayStr;
            setDay(currentDayStr);
          }
        }}
      />
    </div>
  );
}
