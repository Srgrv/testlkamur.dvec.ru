import PeriodSelector from "@/components/PeriodSelector";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState, AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCharges, fetchPayments } from "@/store/slices/payments-slice";

function PaymentsPage() {
  const { loadingPayments, error, payments } = useSelector(
    (state: RootState) => state.payments
  );

  const {
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
  } = useSelector((state: RootState) => state.period);

  const dispatch = useDispatch<AppDispatch>();

  const handlefetchPayments = () => {
    const fromPeriod = selectedFromPeriod.value;
    const toPeriod = selectedToPeriod.value;
    const subscrId = 886458;
    dispatch(
      fetchPayments({
        subscrId,
        selectedFromPeriod: fromPeriod,
        selectedFromYear,
        selectedToPeriod: toPeriod,
        selectedToYear,
      })
    );
  };

  useEffect(() => {
    handlefetchPayments();
  }, [selectedFromPeriod, selectedFromYear, selectedToPeriod, selectedToYear]);

  if (loadingPayments) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  return (
    <>
      <Card className="w-full px-4 sm:px-6 lg:px-10 mx-auto">
        <CardContent>
          <PeriodSelector />

          {error && (
            <div className="flex justify-center items-center h-screen">
              Ошибка: {error}
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Период</TableHead>
                <TableHead>Идентификатор ЛС</TableHead>
                <TableHead>Группа услуг</TableHead>
                <TableHead>Начислено</TableHead>
                <TableHead>Источник платежа</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row.PeriodName.substring(5, row.PeriodName.length)}
                  </TableCell>
                  <TableCell>{row.SubscrId}</TableCell>
                  <TableCell>{row.ServiceGroupName}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.PaymentSource}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default PaymentsPage;
