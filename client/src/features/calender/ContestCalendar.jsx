import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./ContestCalendar.module.css";
import Loader from "../../ui/Loader";

const ContestCalendar = () => {
  // Fetch contests data using React Query
  const {
    data: contests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/contest/allContestsInfo"
      ); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch contests");
      }
      return response.json();
    },
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });
  console.log(contests);
  const calendarEvents = useMemo(() => {
    if (!contests) return [];

    return contests.map((contest) => ({
      title: contest.title,
      start: contest.start,
      end: contest.end,
      url: contest.link,
      extendedProps: {
        platform: contest.platform,
        displayTime: contest.display_start,
      },
    }));
  }, [contests]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        Failed to load contests. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        events={calendarEvents}
        timeZone="Asia/Kolkata"
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          if (info.event.url) {
            window.open(info.event.url, "_blank");
          }
        }}
        eventDisplay="block"
        eventContent={(eventInfo) => (
          <div className={styles.eventContent}>
            <xdiv className={styles.eventTitle}>{eventInfo.event.title}</xdiv>
            <div className={styles.eventPlatform}>
              {eventInfo.event.extendedProps.platform}
            </div>
            <div className={styles.eventTime}>
              {eventInfo.event.extendedProps.displayTime}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ContestCalendar;
