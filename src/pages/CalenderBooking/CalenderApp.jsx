import styles from "./Calender.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import EventDetails from "../../components/eventDetails/eventDetails";
import { getAllEvents } from "../../Apis/calendarEvents";
import { allEvents } from "../../commonFunctions/allEvents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentMonthEvents } from "../../Apis/monthEventDetails";

// const pres

const titles = [
  "Meetings for Today",
  "Pending Meetings in July",
  "Meetings Completed in July",
  "Pending Project Assignment",
];

const CalenderApp = () => {
  const [userName, setUserNAme] = useState("Hr");
  const [popupOpen, setPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [currentMonthDetails, setCurrentMonthDetails] = useState({});
  const [titles, setTitles] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("January");

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
      const res = await getAllEvents(dateRange);
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

  const monthEvents = async () => {
    try {
      const port = 8105;
      const res = await currentMonthEvents(port);
      setCurrentMonthDetails({ ...res });
    } catch (err) {
      console.log("monthEvents ===>", err);
    }
  };

  const handleCurrentMonth = () => {
    // Get today's date
    const today = new Date();

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month number
    const monthNumber = today.getMonth();

    // Get the month name as a string
    const presentMonth = monthNames[monthNumber];
    setCurrentMonth(presentMonth);
  };

  const handleTitles = () => {
    const data = [
      "Meetings for Today",
      `Pending Meetings in ${currentMonth}`,
      `Meetings Completed in ${currentMonth}`,
      "Pending Project Assignment",
    ];
    setTitles(data);
  };

  useEffect(() => {
    document.body.style.overflow = "scroll";
    handleGetAllEvents();
    monthEvents();
    handleCurrentMonth();
    handleTitles();
  }, [dateRange]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Welcome! {userName} </div>
      <div className={styles.subheader}>
        Lets take a moment to check Interview Plannned
      </div>
      <div className={styles.allMeet}>
        <MeetDetails
          data={currentMonthDetails?.meetingsOnDate}
          heading={titles[0]}
        />
        <MeetDetails
          data={currentMonthDetails?.meetingsPending}
          heading={titles[1]}
          color="#FFDABF"
        />
        <MeetDetails
          data={currentMonthDetails?.meetingsCompleted}
          heading={titles[2]}
          color="#FFDABF"
        />
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
        <EventDetails
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

const MeetDetails = ({ data, heading, color }) => {
  return (
    <div className={styles.meetDetails}>
      <div className={styles.circle} style={{ background: `${color}` }}></div>
      <div className={styles.details}>
        <div>{heading}</div>
        <div>{data}</div>
      </div>
    </div>
  );
};

export default CalenderApp;
