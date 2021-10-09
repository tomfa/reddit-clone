import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const getDateMeta = (date: Date) => {
  const d = dayjs(date);
  return {
    year: d.year(),
    week: d.week(),
    month: d.month(), // 0 indexed
  };
};
