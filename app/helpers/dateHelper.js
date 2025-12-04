import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const dateFormatToUI = (dateString, datetype) => {
  if (datetype == "date") {
    return dayjs(dateString.replace("T", "").replace(":00.000Z", "")).format(
      "YYYY-MM-DD"
    );
  } else if (datetype == "time") {
    return dayjs(dateString.replace("T", "").replace(":00.000Z", "")).format(
      "HH:mm"
    );
  }
  return null;
};

export const formatUtcToLocalDateTime = (utcDateString) => {
  if (!utcDateString) {
    return "";
  }

  const dayjsUtc = dayjs.utc(utcDateString);
  const dayjsLocal = dayjsUtc.local();
  return dayjsLocal.format("YYYY-MM-DDTHH:mm");
};

export function formatUtcToUtcInput(utcDateString) {
  if (!utcDateString) {
    return '';
  }

  return dayjs(utcDateString).format('YYYY-MM-DDTHH:mm');
}