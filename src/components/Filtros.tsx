import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "./ui/select";
import { Filtros as FiltrosType } from "../types/tipos";

interface FiltrosProps {
  filtros: FiltrosType;
  setFiltros: (filtros: FiltrosType) => void;
  lojas: Record<string, string>;
}

const ordenarOpcoes = {
  preco: 'Preço',
  desconto: 'Desconto',
  avaliacao: 'Avaliação',
  data: 'Data'
} as const;

export const Filtros = ({ filtros, setFiltros, lojas }: FiltrosProps) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'precoMin' | 'precoMax' | 'descontoMin') => {
    const value = e.target.value;
    setFiltros({ 
      ...filtros, 
      [field]: value === '' ? undefined : Number(value) 
    });
  };

  return (
    <div className="bg-gray-900/90 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-b-lg">
      {/* Filtro por título */}
      <Input
        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-roxo-500"
        placeholder="Buscar jogos..."
        value={filtros.titulo || ""}
        onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value })}
      />

      {/* Filtro por loja */}
      <Select
        value={filtros.loja || "todas"}
        onValueChange={(valor) => {
          setFiltros({ ...filtros, loja: valor === "todas" ? undefined : valor });
        }}
      >
        <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
          <span>{filtros.loja ? `Loja: ${lojas[filtros.loja]}` : "Todas as Lojas"}</span>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          <SelectItem value="todas" className="hover:bg-gray-700 focus:bg-gray-700">
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

      {/* Filtro por faixa de preço */}
      <div className="flex gap-2">
        <Input
          type="number"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-roxo-500"
          placeholder="Preço mínimo"
          value={filtros.precoMin ?? ""}
          onChange={(e) => handleNumberChange(e, 'precoMin')}
          min="0"
        />
        <Input
          type="number"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-roxo-500"
          placeholder="Preço máximo"
          value={filtros.precoMax ?? ""}
          onChange={(e) => handleNumberChange(e, 'precoMax')}
          min="0"
        />
      </div>

      {/* Ordenação */}
      <Select
        value={filtros.ordenarPor || "avaliacao"}
        onValueChange={(valor) => 
          setFiltros({ 
            ...filtros, 
            ordenarPor: valor as keyof typeof ordenarOpcoes
          })
        }
      >
        <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
          <span>Ordenar por: {ordenarOpcoes[filtros.ordenarPor as keyof typeof ordenarOpcoes]}</span>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
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