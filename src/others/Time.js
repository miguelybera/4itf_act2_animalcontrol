// getting the remaining time
export const getTimeRemaining = deadline => deadline - Date.now();

// to get the remaining time in seconds  
export const secondsLeft = timeRemaining => Math.floor(timeRemaining / 1000);