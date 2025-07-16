export default function isLongTrip(
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
    alert(
      `This trip is too long. We cant generate itineraries for trips longer than ${maxDays} days`
    );
    return true;
  }
  return false;
}
