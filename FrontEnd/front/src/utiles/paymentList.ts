export const formatAmount = (
  amount: number,
  currencyThreshold: number = 110,
  currencySymbols: { low: string; high: string } = { low: '$', high: '₩' },
): string => {
  const isDollar = amount <= currencyThreshold;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: isDollar ? 2 : 0, // 달러일 경우 소수점 두 자리 표시
    maximumFractionDigits: isDollar ? 2 : 0,
  }).format(amount);

  const currencySymbol = isDollar ? currencySymbols.low : currencySymbols.high;

  return `${currencySymbol}${formattedAmount}`;
};
