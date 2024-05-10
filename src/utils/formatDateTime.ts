import { format, parseISO } from "date-fns";

const formatDate = (date: Date | undefined) => {
    if (date) {
     
      return format(parseISO(date.toString()), "dd-MM-yyyy");
    }
  };

  const formatDateTime = (date: Date | undefined) => {
    if (date) {
      return format(parseISO(date.toString()), "dd-MM-yyyy HH:mm:ss");
    }
  }

  export {formatDate, formatDateTime};