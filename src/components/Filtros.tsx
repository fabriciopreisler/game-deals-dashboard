import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
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
    <div className="bg-gray-900/90 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg mb-4">
      {/* Campo de busca */}
      <Input
        className="bg-gray-800 text-white placeholder-gray-400 border-0
                   hover:bg-gray-700 focus:ring-2 focus:ring-roxo-600"
        placeholder="Buscar jogos..."
        value={filtros.titulo || ""}
        onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value })}
      />

      {/* Seletor de loja */}
      <Select
        value={filtros.loja || "todas"}
        onValueChange={(valor) => {
          setFiltros({ ...filtros, loja: valor === "todas" ? undefined : valor });
        }}
      >
        <SelectTrigger className="bg-gray-800 text-white border-0 hover:bg-gray-700 focus:ring-2 focus:ring-roxo-600">
          <span>{filtros.loja ? `Loja: ${lojas[filtros.loja]}` : "Todas as Lojas"}</span>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white border-gray-700">
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

      {/* Filtro de preço */}
      <div className="flex gap-2">
        <Input
          type="number"
          className="bg-gray-800 text-white placeholder-gray-400 border-0
                     hover:bg-gray-700 focus:ring-2 focus:ring-roxo-600"
          placeholder="Preço mínimo"
          value={filtros.precoMin ?? ""}
          onChange={(e) => handleNumberChange(e, 'precoMin')}
          min="0"
        />
        <Input
          type="number"
          className="bg-gray-800 text-white placeholder-gray-400 border-0
                     hover:bg-gray-700 focus:ring-2 focus:ring-roxo-600"
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
        <SelectTrigger className="bg-gray-800 text-white border-0 hover:bg-gray-700 focus:ring-2 focus:ring-roxo-600">
          <span>Ordenar por: {ordenarOpcoes[filtros.ordenarPor as keyof typeof ordenarOpcoes]}</span>
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