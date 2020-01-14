export const formatTime = seconds => {
  if (seconds == null || isNaN(seconds) || seconds < 0) {
    return null;
  } else {
    let sec, min, hour;
    hour = Math.floor(seconds / (60 * 60)) + '';
    hour = hour.padStart(2, '0');

    min = Math.floor((seconds / 60) % 60) + '';
    //min >= 60 ? min = (min - 60) + '' : min = min + '';
    min = min.padStart(2, '0');

    sec = (seconds % 60) + '';
    sec = sec.padStart(2, '0');

    return hour + ':' + min + ':' + sec;
  }
};
