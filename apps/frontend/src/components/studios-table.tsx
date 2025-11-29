import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

type StudioType = {
  id: string;
  name: string;
  address: string;
};

interface StudiosTableProps {
  data: StudioType[];
  onRefetch: () => Promise<void>;
}

export function StudiosTable({ data }: StudiosTableProps) {
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
          {data.map((item) => (
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
