import { fetchAccounts } from "@/store/slices/accounts-slice";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "@/components/AccountCard";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading, error } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col  w-full px-4 sm:px-6 lg:px-10 mx-auto">
      {accounts.map((item) => (
        <AccountCard
          key={item.SubscrId}
          SubscrCode={item.SubscrCode}
          OrgId={item.OrgId}
          SubscrId={item.SubscrId}
          FIO={item.FIO}
          Address={item.Address}
        />
      ))}
    </div>
  );
}

export default HomePage;
