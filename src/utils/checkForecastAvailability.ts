
//WholeDate -> Start and End date
// lengthOfForecastAPI -> How many days the API can forecast
export default function checkForecastAvailability(
  wholeDate: string,
  lengthOfForecastAPI: number = 10
): boolean {
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  const endDate = wholeDate.split(" - ")[1];

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
  } else if (differenceInDays > lengthOfForecastAPI) {
    console.log(
      `The end date is more than ${lengthOfForecastAPI} days after the start date! The API can't forecast that far.`
    );
    return false;
  } else {
    return true;
  }
}
