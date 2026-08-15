class Currency {
  static formatNumber(number) {
    number = parseFloat(number);
    if (isNaN(number) || number === null) return;

    if (Math.abs(number) >= 1e12) {
      // Trillion
      return (number / 1e12).toFixed(2) + "T";
    } else if (Math.abs(number) >= 1e9) {
      // Billion
      return (number / 1e9).toFixed(2) + "B";
    } else if (Math.abs(number) >= 1e6) {
      // Million
      return (number / 1e6).toFixed(2) + " million";
    } else if (Math.abs(number) >= 1e3) {
      // Thousand
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      // Default format
      return number.toFixed(2);
    }
  }

  // Examples
  // Output: -220,866.25
}

export default Currency;
