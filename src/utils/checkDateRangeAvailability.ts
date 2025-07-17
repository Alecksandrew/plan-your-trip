export default function checkDateRangeAvailability(
  dateRange: string,
  maxDays: number = 14
): boolean {
  const startDateStr = dateRange.split(" - ")[0];
  const endDateStr = dateRange.split(" - ")[1];

  const parseDate = (date: string) => {
    const [day, month, year]: string[] = date.split("/");
    return new Date(+year, +month - 1, +day);
  };

  const differenceInMs = parseDate(endDateStr).getTime() - parseDate(startDateStr).getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  const tripDuration = differenceInDays + 1; //if the user put trip is only one day 

  if (tripDuration > maxDays) {
    throw new Error ( `This trip is too long. We cant generate itineraries for trips longer than ${maxDays} days`);
  }
  else if (tripDuration <= 0) {
    throw new Error ("The end date is before the start date! You cant travel to the past.");
  } else {
    return true;
  }

}
