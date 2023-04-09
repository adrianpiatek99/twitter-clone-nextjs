import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

type DateType = Date | string | number | dayjs.Dayjs;

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%dsec",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%d years"
  }
});

export const getRelativeTime = (date: DateType) => dayjs(date).fromNow(true);

export const getFormattedDate = (date: DateType, format = "MMMM D, YYYY") =>
  dayjs(date).format(format);

export const convertDateToLocalTime = (date: Date, language = "en") =>
  date.toLocaleTimeString(language, { hour: "2-digit", minute: "2-digit" });
