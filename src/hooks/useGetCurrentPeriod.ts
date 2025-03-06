import { PeriodValue } from "@/store/slices/period-slice";

export const useGetCurrentPeriod = () => {
  function formatMonth(month: number): string {
    return (month + 1).toString().padStart(2, "0");
  }

  function getSixMonthsAgo() {
    const today = new Date();
    const sixMonthsAgo = new Date(today);

    sixMonthsAgo.setMonth(today.getMonth() - 6);

    return sixMonthsAgo;
  }

  const currentDate = new Date();
  const currentMonth = formatMonth(currentDate.getMonth()) as PeriodValue;
  const currentYear = currentDate.getFullYear().toString();

  const sixMonthsAgoDate = getSixMonthsAgo();
  const sixMonthsAgoMonth = formatMonth(
    sixMonthsAgoDate.getMonth()
  ) as PeriodValue;
  const sixMonthsAgoYear = sixMonthsAgoDate.getFullYear().toString();

  // Заполняем данные
  const fromPeriod = sixMonthsAgoMonth;
  const fromYear = sixMonthsAgoYear;
  const toPeriod = currentMonth;
  const toYear = currentYear;

  return {
    fromPeriod,
    fromYear,
    toPeriod,
    toYear,
  };
};
