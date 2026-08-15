export default class Dates {
  static getDate() {
    const estTimezone = "America/New_York";
    const options = { timeZone: estTimezone };
    const currentDateTime = new Date().toLocaleString("en-US", options);
  
    // Create a Date object in the EST timezone
    const estDateTime = new Date(currentDateTime);
  
    // Convert the EST date to UTC format
    const utcDateTime = new Date(estDateTime.toUTCString()).toISOString();
  
    return utcDateTime;
  }

  static getTimeZoneDate() {
    const estTimezone = "America/New_York";
    const options = {
      timeZone: estTimezone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    const currentDateTime = new Date().toLocaleString("en-US", options);
  
    return currentDateTime;
  }
}