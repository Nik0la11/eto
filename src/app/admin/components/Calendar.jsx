"use client"; // Ensures this is a Client Component (needed because of useState, useEffect, localStorage, etc.)

// React and hooks
import React, { useState, useEffect, useRef } from "react";

// FullCalendar plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

// Custom context hooks
import { useClick } from "./Context";
import { useDate } from "./Context";

// Serbian Latin locale for FullCalendar
import srLatinLocale from "../sr-latin";

export default function Calendar() {
  // Events to be shown on the calendar
  const [events, setEvents] = useState([]);

  // Refs to keep track of previously fetched data to avoid unnecessary API calls
  const lastFetchedDate = useRef(null);
  const lastFetchedDay = useRef(null);
  const lastViewType = useRef(null);

  const [day, setDay] = useState(null);

  // Backend base URL
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // Context states
  const { isClicked, setIsClicked } = useClick();
  const { date, setDate } = useDate();

  // Auth token and ref to FullCalendar instance
  const [token, setToken] = useState();
  const calendarRef = useRef(null);

  // Controls whether calendar is ready to fetch events
  const [readyToFetch, setReadyToFetch] = useState(false);

  // Triggered when a date on the calendar is clicked
  const handleDateClick = (arg) => {
    console.log(arg); // Logs clicked date object
    setIsClicked(false);
    setDate(arg.dateStr); // Sets selected date in global state
  };

  // Triggered when a calendar event is clicked
  const handleEventClick = (clickInfo) => {
    alert("Event: " + clickInfo.event.title);
  };

  // Fetches event data from backend for a given date
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
              new Date(slot.start_time).getTime() + 30 * 60 * 1000 // 30 minutes later
            ).toISOString(),
            allDay: true,
            title: `${slot.booked_slots} zakazanih`, // Display how many bookings
          }));
          setEvents(mappedEvents);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => console.error("Error fetching data: ", err));
  };

  // Load token from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // When token and calendar ref are ready, trigger fetch flag
  useEffect(() => {
    if (token && calendarRef.current) {
      setReadyToFetch(true);
    }
  }, [token, calendarRef.current]);

  // Once token is available, fetch events based on current visible calendar date
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

  // If calendar is ready, fetch initial visible range
  useEffect(() => {
    if (!readyToFetch) return;
    const calendarApi = calendarRef.current.getApi();
    const currentStart = calendarApi.view.currentStart
      .toISOString()
      .slice(0, 10);
    lastFetchedDate.current = currentStart;
    fetchEvents(currentStart);
  }, [readyToFetch]);

  // When a specific day is selected (like from day view), fetch its booked time slots
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
        ref={calendarRef} // Stores the calendar instance for direct access
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        height="100%"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locales={[srLatinLocale]} // Serbian Latin translation
        locale="sr-Latn"
        events={events} // Event list passed into calendar
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
        datesSet={(arg) => {
          // Called when the calendar view or date changes
          const viewStart = arg.start.toISOString().slice(0, 10);
          const viewType = arg.view.type;

          if (viewType === "dayGridMonth" || viewType === "timeGridWeek") {
            // For month/week view: fetch by view start date
            setDay(null);
            lastFetchedDay.current = null;
            if (lastFetchedDate.current === viewStart) return;
            lastFetchedDate.current = viewStart;
            fetchEvents(viewStart);
          } else if (viewType === "timeGridDay" || viewType === "dayGridDay") {
            // For day view: fetch by selected day
            const currentDayStr = arg.start.toLocaleDateString("sv-SE"); // Format: YYYY-MM-DD
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
