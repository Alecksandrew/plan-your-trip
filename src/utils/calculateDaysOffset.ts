//Calculate if the user start the trip today or in some days
export default function calculateDaysOffset(startDate:string):number | undefined {
    if(!startDate.includes("/")) {
        console.log("The start date is not in a valid format (DD/MM/YYYY)");
        return
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