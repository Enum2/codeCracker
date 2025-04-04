export function getAllSolved(ratingWiseSolved) {
  let total = 0;
  for (let rating in ratingWiseSolved) {
    total += ratingWiseSolved[rating];
  }
  return total;
}
