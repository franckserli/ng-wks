const NB_STARS = 5;

export default rating =>
  [...Array(NB_STARS)]
    .map((key, index) => index < +rating)
    .reverse();
