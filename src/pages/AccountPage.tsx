import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth-slice";
import { LogOut } from "lucide-react";
import PeriodSelector from "@/components/PeriodSelector";

function AccountPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { charges } = useSelector((state: RootState) => state.payments);

  if (!id) {
    return <div>Ошибка: ID не найден</div>;
  }

  const chargesForId = charges[+id] || { ChargeDetails: [] };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="h-20 bg-pink-400 flex justify-between p-3 items-center">
        <NavLink to="/">Home</NavLink>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </header>
      <Card className="w-full px-4 sm:px-6 lg:px-10 mx-auto">
        <CardHeader>
          <CardTitle>
            <NavLink to="/">Назад</NavLink>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PeriodSelector />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Период</TableHead>
                <TableHead>К оплате на начало месяца</TableHead>
                <TableHead>Начислено</TableHead>
                <TableHead>Оплачено</TableHead>
                <TableHead>К оплате</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chargesForId?.ChargeDetails.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.Tariff}</TableCell>
                  <TableCell>{row.GroupName}</TableCell>
                  <TableCell>{row.Quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default AccountPage;
