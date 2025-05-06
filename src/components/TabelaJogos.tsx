// src/components/TabelaJogos.tsx
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { formatarMoeda } from "../utils/formatadores";
import { Jogo } from "../types/tipos";

export const colunas: ColumnDef<Jogo>[] = [
  {
    accessorKey: "titulo",
    header: "Jogo",
    cell: ({ row }) => <span className="font-bold">{row.getValue("titulo")}</span>,
  },
  {
    accessorKey: "precoAtual",
    header: "Preço Atual",
    cell: ({ row }) => formatarMoeda(Number(row.getValue("precoAtual"))),
  },
  {
    accessorKey: "desconto",
    header: "Desconto",
    cell: ({ row }) => `${row.getValue("desconto")}%`,
  },
  {
    accessorKey: "loja",
    header: "Loja",
    cell: ({ row }) => {
      const lojas: Record<string, string> = {
        "1": "Steam",
        "2": "Epic",
        "3": "GOG",
      };
      const lojaValue = row.getValue("loja") as string;
      return lojas[lojaValue] || lojaValue;
    },
  },
];

interface TabelaJogosProps {
  data: Jogo[];
}

export function TabelaJogos({ data }: TabelaJogosProps) {
  const table = useReactTable({
    data,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}