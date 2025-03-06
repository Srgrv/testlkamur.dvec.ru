import { AppDispatch } from "@/store";
import { fetchCharges } from "@/store/slices/payments-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const periods = [
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

const years = ["2025", "2024", "2023", "2022"];

export const usePeriodSelector = () => {
  const [selectedFromPeriod, setSelectedFromPeriod] = useState(periods[9]);
  const [selectedFromYear, setSelectedFromYear] = useState("2024");
  const [selectedToPeriod, setSelectedToPeriod] = useState(periods[2]);
  const [selectedToYear, setSelectedToYear] = useState("2025");

  const dispatch = useDispatch<AppDispatch>();

  const handlefetchCharges = () => {
    const fromPeriod = selectedFromPeriod.value;
    const toPeriod = selectedToPeriod.value;

    dispatch(
      fetchCharges({
        selectedFromYear,
        fromPeriod,
        selectedToYear,
        toPeriod,
      })
    );
  };

  return {
    handlefetchCharges,
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
    setSelectedFromPeriod,
    setSelectedFromYear,
    setSelectedToPeriod,
    setSelectedToYear,
    periods,
    years,
  };
};
