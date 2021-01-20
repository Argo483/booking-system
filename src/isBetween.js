
export const isBetween = (dateToCheck, startDate, endDate) => {
    if (
      dateToCheck.unix() >= startDate.unix() &&
      dateToCheck.unix() <= endDate.unix()
    ) {
      return true;
    } else {
      return false;
    }
  };
