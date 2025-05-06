import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { formatarMoeda } from "../utils/formatadores";
import { Jogo } from "../types/tipos";

export const colunas: ColumnDef<Jogo>[] = [
  {
    accessorKey: "titulo",
    header: "Jogo",
    cell: ({ row }) => <span className="font-medium">{row.getValue("titulo")}</span>,
  },
  {
    accessorKey: "precoAtual",
    header: "Preço Atual",
    cell: ({ row }) => (
      <span className="text-green-400">
        {formatarMoeda(Number(row.getValue("precoAtual")))}
      </span>
    ),
  },
  {
    accessorKey: "desconto",
    header: "Desconto",
    cell: ({ row }) => (
      <span className="text-red-400">
        {row.getValue("desconto")}%
      </span>
    ),
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
      return <span className="text-white">{lojas[lojaValue] || lojaValue}</span>;
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
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
      <table className="w-full">
        <thead className="bg-roxo-800">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-gray-900/90 divide-y divide-gray-800">
          {table.getRowModel().rows.map(row => (
            <tr 
              key={row.id} 
              className="hover:bg-gray-800/70 transition-colors duration-150"
            >
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className="px-6 py-4 whitespace-nowrap text-sm"
                >
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