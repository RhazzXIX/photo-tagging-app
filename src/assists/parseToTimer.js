export default function parseToTimer(num) {
  const numToTimer = {
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  };
  if (!num) return numToTimer;
  numToTimer.minutes = Math.floor(num / 1000 / 60);
  numToTimer.seconds = Math.floor(
    (num / 1000 / 60 - Math.floor(num / 1000 / 60)) * 60
  );
  numToTimer.milliseconds = Math.round(
    (num / 1000 - Math.floor(num / 1000)) * 1000
  );
  return numToTimer;
}
