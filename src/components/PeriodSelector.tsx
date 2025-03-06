import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import {
  PeriodName,
  setSelectedFromPeriod,
  setSelectedFromYear,
  setSelectedToPeriod,
  setSelectedToYear,
} from "@/store/slices/period-slice";

function PeriodSelector() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    periods,
    years,
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
  } = useSelector((state: RootState) => state.period);

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <div className="flex gap-2">
        {/*Выбор месяца */}

        <Select
          onValueChange={(value: PeriodName) => {
            const selectedPeriod = periods.find((p) => p.name === value);
            if (selectedPeriod) {
              dispatch(
                setSelectedFromPeriod({
                  value: selectedPeriod.value,
                  name: selectedPeriod.name,
                })
              );
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedFromPeriod.name} />
          </SelectTrigger>
          <SelectContent>
            {periods.map((period) => (
              <SelectItem key={period.name} value={period.name}>
                {period.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/*Выбор года */}

        <Select
          onValueChange={(value: string) => {
            dispatch(setSelectedFromYear(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedFromYear} />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span>по</span>
      <div className="flex gap-2">
        {/*Выбор месяца */}
        <Select
          onValueChange={(value: PeriodName) => {
            const selectedPeriod = periods.find((p) => p.name === value);
            if (selectedPeriod) {
              dispatch(
                setSelectedToPeriod({
                  value: selectedPeriod.value,
                  name: selectedPeriod.name,
                })
              );
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedToPeriod.name} />
          </SelectTrigger>
          <SelectContent>
            {periods.map((period) => (
              <SelectItem key={period.name} value={period.name}>
                {period.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/*Выбор года */}
        <Select
          onValueChange={(value: string) => {
            dispatch(setSelectedToYear(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedToYear} />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default PeriodSelector;
