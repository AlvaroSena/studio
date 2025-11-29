import { StudiosTable } from "@/components/studios-table";
import { getStudios } from "@/lib/api";
import { useEffect, useState } from "react";
import { CreateStudioDialog } from "@/components/create-studio-dialog";

type StudioType = {
  id: string;
  name: string;
  address: string;
};

export function Studios() {
  const [items, setItems] = useState<StudioType[]>([]);

  const loadData = async () => {
    const data = await getStudios();

    if (data) {
      setItems(data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mx-4 lg:mx-6">
      <div className="flex flex-row items-center justify-between mb-8">
        <h1 className="text-2xl poppins-bold text-primary">Studios</h1>
        <CreateStudioDialog onRefetch={() => loadData()} />
      </div>

      <StudiosTable data={items} onRefetch={() => loadData()} />
    </div>
  );
}
