export default function checkDateRangeAvailability(
  dateRange: string,
  maxDays: number = 14
): boolean {
  if (!dateRange.includes("-")) {
    throw new Error(
      "The date range is not in a valid format (DD/MM/YYYY - DD/MM/YYYY). It must contain a '-'"
    );
  }
  const [startDateStr, endDateStr] = dateRange.split(" - ");

  if (dateRange.split(" - ").length !== 2) {
    throw new Error(
      "The date range is not valid. It must be in the format 'DD/MM/YYYY - DD/MM/YYYY'"
    );
  }

  if (
    startDateStr.split("/").length !== 3 ||
    endDateStr.split("/").length !== 3
  ) {
    throw new Error(
      "The date range is not in a valid format (DD/MM/YYYY - DD/MM/YYYY). It must contain a day, a month and a year"
    );
  }
 
  const [startDay, startMonth, startYear] = startDateStr.split("/");
  const [endDay, endMonth, endYear] = endDateStr.split("/");
  
  if (
    startDay.length !== 2 ||
    endDay.length !== 2 ||
    startMonth.length !== 2 ||
    endMonth.length !== 2 ||
    startYear.length !== 4 ||
    endYear.length !== 4
  ) {
    throw new Error(
      "The date range is not in a valid format (DD/MM/YYYY - DD/MM/YYYY). The day must be 2 digits, the month must be 2 digits and the year must be 4 digits"
    );
  }

  const parseDate = (date: string) => {
    const [day, month, year]: string[] = date.split("/");
    return new Date(+year, +month - 1, +day);
  };

  const startDateObject = parseDate(startDateStr);
  const endDateObject = parseDate(endDateStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDateObject < today) {
    throw new Error(
      "The start date is before today! You cant travel to the past."
    );
  }

  const differenceInMs = endDateObject.getTime() - startDateObject.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  const tripDuration = differenceInDays + 1; //if the user put trip is only one day

  if (tripDuration > maxDays) {
    throw new Error(
      `This trip is too long. We cant generate itineraries for trips longer than ${maxDays} days`
    );
  } else if (tripDuration <= 0) {
    throw new Error(
      "The end date is before the start date! You cant travel to the past."
    );
  } else {
    return true;
  }
}
