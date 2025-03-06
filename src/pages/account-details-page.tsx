"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPayments } from "@/store/slices/payments-slice";
import { setPeriod } from "@/store/slices/period-slice";
import { formatDate } from "@/lib/utils";
import type { AppDispatch, RootState } from "@/store";

export default function AccountDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { accounts } = useSelector((state: RootState) => state.accounts);
  const { payments, loadingPayments } = useSelector(
    (state: RootState) => state.payments
  );
  const { periodBegin, periodEnd } = useSelector(
    (state: RootState) => state.period
  );

  const [selectedYear, setSelectedYear] = useState<string>(
    periodBegin.substring(0, 4)
  );

  const account = accounts.find((acc) => acc.SubscrId === Number(id));

  useEffect(() => {
    if (id) {
      dispatch(
        fetchPayments({
          subscrId: Number(id),
          periodBegin,
          periodEnd,
        })
      );
    }
  }, [dispatch, id, periodBegin, periodEnd]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);

    // Устанавливаем период с января по декабрь выбранного года
    dispatch(
      setPeriod({
        periodBegin: `${year}01`,
        periodEnd: `${year}12`,
      })
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Лицевой счет не найден</p>
      </div>
    );
  }

  // Получаем текущий год и предыдущие 5 лет для выбора периода
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку счетов
          </Button>
          <h1 className="text-3xl font-bold">
            Лицевой счет № {account.SubscrCode}
          </h1>
          <p className="text-muted-foreground">
            {account.FIO}, {account.Address}
          </p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">История платежей</h2>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Платежи за период</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPayments ? (
              <p className="py-4 text-center text-muted-foreground">
                Загрузка платежей...
              </p>
            ) : payments.length === 0 ? (
              <p className="py-4 text-center text-muted-foreground">
                Платежи за выбранный период не найдены
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата платежа</TableHead>
                    <TableHead>Период</TableHead>
                    <TableHead>Источник платежа</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.PaymenId}>
                      <TableCell>{formatDate(payment.Date)}</TableCell>
                      <TableCell>{payment.PeriodName}</TableCell>
                      <TableCell>{payment.PaymentSource}</TableCell>
                      <TableCell className="text-right font-medium">
                        {payment.Amount.toFixed(2)} ₽
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
