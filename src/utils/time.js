
export const formattedDateTime = (currentDateTime) => {
    const dateObject = new Date(currentDateTime);

    const day = dateObject.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    
    return {
          date: `${day} ${monthNames[monthIndex]} ${year}`,
          time: `${hours}:${minutes}`
        };
};