import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudios } from "@/lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface StudioType {
  id: string;
  name: string;
  address: string;
}

export function StudiosTable() {
  const [items, setItems] = useState<StudioType[]>([]);

  useEffect(() => {
    getStudios().then((data) => setItems(data));
  }, []);

  return (
    <div>
      <Table>
        <TableHeader className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead className="">Endereço</TableHead>
          </TableRow>
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="border-none odd:bg-muted/50 hover:bg-transparent odd:hover:bg-muted/50"
            >
              <TableCell className="py-2.5 font-medium underline">
                <Link to={`/studios/agenda/${item.id}`}>{item.name}</Link>
              </TableCell>
              <TableCell className="py-2.5">{item.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
      </Table>
    </div>
  );
}
