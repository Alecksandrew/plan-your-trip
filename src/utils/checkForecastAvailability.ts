//WholeDate -> Start and End date -> Ex: 01/01/2021 - 02/01/2021
// maxForecastDays -> How many days the API can forecast
export default function checkForecastAvailability(
  dateRange: string,
  maxForecastDays: number = 10
): number | boolean {
  if (!dateRange.includes("-")) {
    console.log(
      "The date range is not in a valid format (DD/MM/YYYY - DD/MM/YYYY). It must contain a '-'"
    );
    return false;
  }

  const parts = dateRange.split(" - ");
  if (parts.length !== 2) {
    console.log(
      "The date range is not valid. It must be in the format 'DD/MM/YYYY - DD/MM/YYYY'"
    );
    return false;
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
    console.log(
      "The end date is before the start date! You cant travel to the past."
    );
    return false;
  } else if (differenceInDays > maxForecastDays) {
    console.log(
      `The end date is more than ${maxForecastDays} days after the start date! The API can't forecast that far.`
    );
    return false;
  } else {
    return differenceInDays;
  }
}
