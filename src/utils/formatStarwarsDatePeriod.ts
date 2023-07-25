export function formatStarwarsDatePeriod(date: number) {
  // if it is below 0 it is BBY if 0 or over it is ABY then return the number positive with ABY or BBY
  return date <= 0 ? `${Math.abs(date)} BBY` : `${date} ABY`;
}
