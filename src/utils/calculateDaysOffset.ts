//Calculate if the user start the trip today or in some days
export default function calculateDaysOffset(startDate:string):number{
    if(!startDate.includes("/")) {
        throw new Error("Error when calculating days offset: The start date is not in a valid format (DD/MM/YYYY). It must contain a '/'");
    }

    if(startDate.split("/").length !== 3) {
        throw new Error("Error when calculating days offset: The start date is not in a valid format (DD/MM/YYYY). It must contain a day, a month and a year");
    }

    if(startDate.split("/")[0].length !== 2 || startDate.split("/")[1].length !== 2 || startDate.split("/")[2].length !== 4) {
        throw new Error("Error when calculating days offset: The start date is not in a valid format (DD/MM/YYYY). The day must be 2 digits, the month must be 2 digits and the year must be 4 digits");
    }
    
    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    const [day, month, year] = startDate.split("/");

    const startDateObject = new Date(+year, +month - 1, +day);

    const differenceInMiliseconds =
    startDateObject.getTime() - dateNow.getTime();
    
    const daysOffset = Math.ceil(
    differenceInMiliseconds / (1000 * 60 * 60 * 24)
    );

    return daysOffset;
}