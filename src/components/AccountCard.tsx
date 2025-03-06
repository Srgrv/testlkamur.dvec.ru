import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export interface Account {
  SubscrId: number;
  OrgId: number;
  SubscrCode: string;
  FIO: string;
  Address: string;
}

function AccountCard({ SubscrId, OrgId, SubscrCode, FIO, Address }: Account) {
  return (
    <Card className="m-4  shadow-2xl shadow-gray-400">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{FIO}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          ЛС: {SubscrCode} (ID: {SubscrId})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Организация ID: {OrgId}</p>
        <p className="text-gray-700">Адрес: {Address}</p>
      </CardContent>
    </Card>
  );
}

export default AccountCard;
