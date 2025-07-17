//WholeDate -> Start and End date -> Ex: 01/01/2021 - 02/01/2021
// maxForecastDays -> How many days the API can forecast
export default function checkForecastAvailability(
  dateRange: string,
  maxForecastDays: number = 10
): number {
  if (!dateRange.includes("-")) {
    throw new Error(
      "The date range is not in a valid format (DD/MM/YYYY - DD/MM/YYYY). It must contain a '-'"
    );
  }

  const parts = dateRange.split(" - ");
  if (parts.length !== 2) {
    throw new Error(
      "The date range is not valid. It must be in the format 'DD/MM/YYYY - DD/MM/YYYY'"
    );
  }

  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  const endDate = parts[1];

  const [day, month, year] = endDate.split("/");

  const endDateObject = new Date(+year, +month - 1, +day);

  const differenceInMiliseconds = endDateObject.getTime() - dateNow.getTime();

  const differenceInDays = Math.ceil(
    differenceInMiliseconds / (1000 * 60 * 60 * 24)
  );
  //If the difference between today and end date is more than 10 days, then the API wont return data,
  // so we need to return false
  if (differenceInDays <= 0) {
    throw new Error(
      "The end date is before the start date! You cant travel to the past."
    );
  } else if (differenceInDays > maxForecastDays) {
    throw new Error(
      `The end date is more than ${maxForecastDays} days after the start date! The API can't forecast that far.`
    );
  } else {
    return differenceInDays;
  }
}
