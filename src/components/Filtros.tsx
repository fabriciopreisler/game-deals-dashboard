import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "./ui/select";
import { Filtros as FiltrosType } from "../types/tipos";

interface FiltrosProps {
  filtros: FiltrosType;
  setFiltros: (filtros: FiltrosType) => void;
  lojas: Record<string, string>;
  className?: string;
}

const ordenarOpcoes = {
  preco: 'Preço',
  desconto: 'Desconto',
  avaliacao: 'Avaliação',
  data: 'Data'
} as const;

export const Filtros = ({ filtros, setFiltros, lojas, className }: FiltrosProps) => {
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'precoMin' | 'precoMax' | 'descontoMin'
  ) => {
    const value = e.target.value;
    setFiltros({ 
      ...filtros, 
      [field]: value === '' ? undefined : Number(value) 
    });
  };

  return (
    <div className={`bg-gray-800/90 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg mb-6 ${className}`}>
      <Input
        className="bg-gray-700 text-white placeholder-gray-400 border-0 h-10
                   hover:bg-gray-600 focus:ring-2 focus:ring-purple-600"
        placeholder="Buscar jogos..."
        value={filtros.titulo || ""}
        onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value })}
      />

      <Select
        value={filtros.loja || "todas"}
        onValueChange={(valor) => {
          setFiltros({ 
            ...filtros, 
            loja: valor === "todas" ? undefined : valor
          });
        }}
      >
        <SelectTrigger className="bg-gray-700 text-white border-0 h-10 hover:bg-gray-600 focus:ring-2 focus:ring-purple-600">
          <span className="truncate">
            {filtros.loja ? `Loja: ${lojas[filtros.loja]}` : "Todas as Lojas"}
          </span>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white border-gray-700 max-h-[300px] overflow-y-auto">
          <SelectItem 
            value="todas" 
            className="hover:bg-gray-700 focus:bg-gray-700"
          >
            Todas
          </SelectItem>
          {Object.entries(lojas).map(([id, nome]) => (
            <SelectItem 
              key={id} 
              value={id}
              className="hover:bg-gray-700 focus:bg-gray-700"
            >
              {nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2 h-10">
        <Input
          type="number"
          className="bg-gray-700 text-white placeholder-gray-400 border-0 flex-1
                     hover:bg-gray-600 focus:ring-2 focus:ring-purple-600 h-full"
          placeholder="Mín"
          value={filtros.precoMin ?? ""}
          onChange={(e) => handleNumberChange(e, 'precoMin')}
          min="0"
        />
        <Input
          type="number"
          className="bg-gray-700 text-white placeholder-gray-400 border-0 flex-1
                     hover:bg-gray-600 focus:ring-2 focus:ring-purple-600 h-full"
          placeholder="Máx"
          value={filtros.precoMax ?? ""}
          onChange={(e) => handleNumberChange(e, 'precoMax')}
          min="0"
        />
      </div>

      <Select
        value={filtros.ordenarPor || "avaliacao"}
        onValueChange={(valor) => 
          setFiltros({ 
            ...filtros, 
            ordenarPor: valor as keyof typeof ordenarOpcoes
          })
        }
      >
        <SelectTrigger className="bg-gray-700 text-white border-0 h-10 hover:bg-gray-600 focus:ring-2 focus:ring-purple-600">
          <span className="truncate">
            Ordenar por: {ordenarOpcoes[filtros.ordenarPor as keyof typeof ordenarOpcoes]}
          </span>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white border-gray-700">
          {Object.entries(ordenarOpcoes).map(([value, label]) => (
            <SelectItem 
              key={value} 
              value={value}
              className="hover:bg-gray-700 focus:bg-gray-700"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};