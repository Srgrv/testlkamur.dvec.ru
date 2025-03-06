import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useGetCurrentPeriod } from "@/hooks/useGetCurrentPeriod";

export type PeriodValue =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

export type PeriodName =
  | "Январь"
  | "Февраль"
  | "Март"
  | "Апрель"
  | "Май"
  | "Июнь"
  | "Июль"
  | "Август"
  | "Сентябрь"
  | "Октябрь"
  | "Ноябрь"
  | "Декабрь";

interface Period {
  value: PeriodValue; // Значение периода
  name: PeriodName; // Название периода
}

interface PeriodState {
  selectedFromPeriod: Period;
  selectedFromYear: string;
  selectedToPeriod: Period;
  selectedToYear: string;
  years: string[];
  periods: Period[];
}

const periods: Period[] = [
  { value: "01", name: "Январь" },
  { value: "02", name: "Февраль" },
  { value: "03", name: "Март" },
  { value: "04", name: "Апрель" },
  { value: "05", name: "Май" },
  { value: "06", name: "Июнь" },
  { value: "07", name: "Июль" },
  { value: "08", name: "Август" },
  { value: "09", name: "Сентябрь" },
  { value: "10", name: "Октябрь" },
  { value: "11", name: "Ноябрь" },
  { value: "12", name: "Декабрь" },
];

const years: string[] = ["2025", "2024", "2023", "2022"];

const { fromPeriod, fromYear, toPeriod, toYear } = useGetCurrentPeriod();

const initialState: PeriodState = {
  selectedFromPeriod: {
    value: fromPeriod,
    name: periods.find((p) => p.value === fromPeriod)!.name,
  },
  selectedFromYear: fromYear,
  selectedToPeriod: {
    value: toPeriod,
    name: periods.find((p) => p.value === toPeriod)!.name,
  },
  selectedToYear: toYear,
  years,
  periods,
};

const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    setSelectedFromPeriod: (
      state,
      action: PayloadAction<{ value: PeriodValue; name: PeriodName }>
    ) => {
      state.selectedFromPeriod = {
        value: action.payload.value,
        name: action.payload.name,
      };
    },
    setSelectedFromYear: (state, action: PayloadAction<string>) => {
      state.selectedFromYear = action.payload;
    },
    setSelectedToPeriod: (
      state,
      action: PayloadAction<{ value: PeriodValue; name: PeriodName }>
    ) => {
      state.selectedToPeriod = {
        value: action.payload.value,
        name: action.payload.name,
      };
    },
    setSelectedToYear: (state, action: PayloadAction<string>) => {
      state.selectedToYear = action.payload;
    },
  },
});

export const {
  setSelectedFromPeriod,
  setSelectedFromYear,
  setSelectedToPeriod,
  setSelectedToYear,
} = periodSlice.actions;
export default periodSlice.reducer;
