// Using YYYY-mm-dd
export const mongoDateformat = (date) => {
  // To convert the monogo date to modern date format
  // console.log(
  //   // September 5, 1486
  //   new Date(response.dob).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   })
  // );
  return new Date(date);
};
