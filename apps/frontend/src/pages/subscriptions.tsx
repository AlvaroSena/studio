import { SubscriptionsTable } from "@/components/subscriptions-table";
import { getSubscriptions } from "@/lib/api";
import { useEffect, useState } from "react";

type Subscription = {
  id: string;
  studentId: string;
  studentName: string;
  planPeriod: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "CANCELED";
  startDate: Date;
  endDate: Date;
};

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  async function loadData() {
    const data = await getSubscriptions();

    if (data) {
      setSubscriptions(data);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mx-8">
      <h1 className="text-2xl poppins-bold text-primary">Assinaturas</h1>
      <div className="my-8">
        <SubscriptionsTable data={subscriptions} onRefetch={loadData} />
      </div>
    </div>
  );
}
