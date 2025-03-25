import { format } from "date-fns";

export function useDateFormat() {
  const formatDate = (date: Date, formatStr = "yyyy-MM-dd") => {
    return format(date, formatStr);
  };

  return { formatDate };
}
