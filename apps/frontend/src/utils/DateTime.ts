export const getISTDateTimeFromUTC = (dateString: string, is12hrs?:boolean):string => {
    const utcDate = new Date(dateString);
    
    // Convert to Indian Standard Time (IST)
    const istDate = utcDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: is12hrs, //set to `true` for 12-hour format
    });
    
    // Output the IST formatted date-time string
    // console.log(istDate); // e.g., "10/10/2024, 23:22:31"

    return istDate;
}