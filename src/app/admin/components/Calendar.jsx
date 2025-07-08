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
import { useClick, useStatus, useDate, useSlotID } from "./Context";

// Serbian Latin locale for FullCalendar
import srLatinLocale from "../sr-latin";
import { Cuprum } from "next/font/google";

export default function Calendar() {
  const colorMap = {
    booked: "#3498db",
    missed: "#e74c3c",
    available: "#9b59b6",
    completed: "#2ecc71",
  };
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
  const { setIsClicked } = useClick();
  const { setDate } = useDate();
  const { setSlotID } = useSlotID();
  const { setStatus } = useStatus();
  // Auth token and ref to FullCalendar instance
  const [token, setToken] = useState();
  const calendarRef = useRef(null);

  // Controls whether calendar is ready to fetch events
  const [readyToFetch, setReadyToFetch] = useState(false);
  const [monthEvents, setMonthEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  // Triggered when a date on the calendar is clicked
  const handleDateClick = (arg) => {
    console.log(arg); // Logs clicked date object
    setIsClicked(false);
    setDate(arg.dateStr); // Sets selected date in global state
  };

  // Triggered when a calendar event is clicked
  const handleEventClick = (clickInfo) => {
    setIsClicked(false);
    const slotID = clickInfo.event.extendedProps.slotId;
    const status = clickInfo.event.extendedProps.status;

    if (status) {
      setStatus(status);
    }

    if (slotID) {
      setSlotID(slotID);
    }
  };

  // Fetches event data from backend for a given date
  const fetchMonthEvents = async (formattedDate) => {
    if (!token) return [];
    const nextMonth = getFirstDayOfNextMonth(formattedDate);
    console.log(formattedDate);
    console.log(nextMonth);
    try {
      const res = await fetch(`${BASE_URL}/v1/admin/get_calendar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day: formattedDate }),
        credentials: "include",
      });
      const json = await res.json();
      console.log("API /get_calendar response:", json);
      if (json && json.data) {
        const mappedEvents = json.data.map((slot) => ({
          start: slot.start_time,
          end: new Date(
            new Date(slot.start_time).getTime() + 30 * 60 * 1000 // 30 minutes later
          ).toISOString(),
          allDay: true,
          title: `${slot.booked_slots} zakazanih`, // Display how many bookings
        }));

        return mappedEvents;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching data:", err);

      return [];
    }
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
    const firstDayOfNextMonth = getFirstDayOfNextMonth(currentStart);
    const storageKey = `events_${firstDayOfNextMonth}`;

    const storedData = localStorage.getItem(storageKey);

    if (storedData) {
      const parsedEvents = JSON.parse(storedData);
      setMonthEvents(parsedEvents); // store for later filtering
      setEvents(parsedEvents); // show them now
    } else {
      fetchMonthEvents(firstDayOfNextMonth).then((fetchedEvents) => {
        localStorage.setItem(storageKey, JSON.stringify(fetchedEvents));
        setMonthEvents(fetchedEvents); // store for reuse
        setEvents(fetchedEvents); // show in calendar
      });
    }
  }, [token, readyToFetch]);

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
            allDay: false,
            extendedProps: { slotId: slot.id, status: slot.status },
            backgroundColor: colorMap[slot.status],
            borderColor: colorMap[slot.status],
          }));

          setDayEvents(mappedEvents);
          setEvents(mappedEvents);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, [day]);

  function getFirstDayOfNextMonth(date) {
    const d = new Date(date);
    const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 2);
    const formatted = nextMonth.toISOString().slice(0, 10); // "YYYY-MM-DD"
    return formatted;
  }

  useEffect(() => {
    if (currentView === "dayGridMonth") {
      setEvents(monthEvents);
    } else if (currentView === "timeGridWeek") {
      const start = calendarRef.current?.getApi().view.currentStart;
      const end = calendarRef.current?.getApi().view.currentEnd;

      const filteredWeekEvents = monthEvents.filter((event) => {
        const eventStart = new Date(event.start);
        return eventStart >= start && eventStart < end;
      });

      setEvents(filteredWeekEvents);
    } else if (currentView === "timeGridDay" || currentView === "dayGridDay") {
      setEvents(dayEvents);
    }
  }, [currentView, monthEvents, dayEvents]);

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
          right: "dayGridMonth,dayGridWeek,timeGridDay",
        }}
        locales={[srLatinLocale]} // Serbian Latin translation
        locale="sr-Latn"
        events={events} // Event list passed into calendar
        dateClick={handleDateClick}
        eventClick={(info) => {
          const viewType = info.view.type;

          if (viewType === "dayGridDay" || viewType === "timeGridDay") {
            handleEventClick(info);
          } else {
            info.jsEvent.preventDefault();
          }
        }}
        selectable={true}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={true}
        datesSet={(arg) => {
          // Called when the calendar view or date changes
          const viewStart = arg.start.toISOString().slice(0, 10);
          const nextMonthFirstDay = getFirstDayOfNextMonth(viewStart);
          const viewType = arg.view.type;
          const viewEnd = arg.end.toISOString().slice(0, 10);
          setCurrentView(arg.view.type);

          const currentMonthEvents = monthEvents;

          if (viewType === "dayGridMonth") {
            // For month/week view: fetch by view start date
            const currentEventKeys = events
              .map((e) => e.start + e.end + e.title)
              .join();
            const newEventKeys = currentMonthEvents
              .map((e) => e.start + e.end + e.title)
              .join();
            if (currentEventKeys !== newEventKeys) {
              setEvents(monthEvents);
            }
          } else if (viewType === "dayGridWeek") {
            const startDate = new Date(arg.start);
            const endDate = new Date(arg.end);
            const filteredWeekEvents = currentMonthEvents.filter((event) => {
              const eventStart = new Date(event.start);
              return eventStart >= startDate && eventStart < endDate;
            });
            const currentEventKeys = events
              .map((e) => e.start + e.end + e.title)
              .join();
            const newEventKeys = filteredWeekEvents
              .map((e) => e.start + e.end + e.title)
              .join();
            if (currentEventKeys !== newEventKeys) {
              setEvents(filteredWeekEvents);
            }
          } else if (viewType === "timeGridDay" || viewType === "dayGridDay") {
            // For day view: fetch by selected day
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
