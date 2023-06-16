import styles from "./ExpertCalendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../../Apis/calendarEvents";
import { allEvents } from "../../../commonFunctions/allEvents";
import { CandidateDetails } from "../CandidateDetails/candidateDetails";
import { toast } from "react-toastify";

export const ExpertCalendar = () => {
  const [userName, setUserNAme] = useState("Expert ");
  const [popupOpen, setPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleEventClick = (info) => {
    const event = info.event;
    const startDate = new Date(event.start);
    const currentDate = new Date();
    const startTimePlusOneHour = new Date(startDate.getTime() + 60 * 60 * 1000);

    if (currentDate <= startTimePlusOneHour) {
      setSelectedEvent(info.event);
      setPopupOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      toast("Sorry, the event has already passed", {
        autoClose: 2000, // Display duration in milliseconds (1 second)
      });
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    document.body.style.overflow = "scroll";
  };

  const handleGetAllEvents = async () => {
    // console.log("called handleGetAllEvents");

    try {
      const port = 8108;
      const res = await getAllEvents(dateRange, port);
      const data = allEvents(res.meetings);
      // console.log("res", data);
      setEvents([...data]);
    } catch (err) {
      console.log("error in handleGetAllEvents ===>", err);
    }
  };

  const handleDateSet = (dateRange) => {
    const { start, end } = dateRange;
    // console.log(start, end);
    // console.log(dateRange);
    // console.log("called handleDateSet");
    const newRange = {
      startDate: start,
      endDate: end,
    };
    setDateRange({ ...newRange });
  };

  useEffect(() => {
    document.body.style.overflow = "scroll";
    handleGetAllEvents();
  }, [dateRange]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Welcome! {userName} </div>
      <div className={styles.subheader}>
        Lets take a moment to check Interview Plannned
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          // right: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "timeGridWeek,timeGridDay",
        }}
        initialView="timeGridDay"
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        datesSet={handleDateSet}
      />

      {popupOpen && (
        <CandidateDetails
          handleClosePopup={handleClosePopup}
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
};

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <div className={styles.eventDetails}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
