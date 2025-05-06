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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Input
        className="combobox"
        placeholder="Buscar jogos..."
        value={filtros.titulo || ""}
        onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value })}
      />

      <Select
        value={filtros.loja || "todas"}
        onValueChange={(valor) => {
          const newValue = valor === "todas" ? undefined : valor;
          setFiltros({ ...filtros, loja: newValue });
        }}
      >
        <SelectTrigger className="combobox">
          <span>{filtros.loja ? `Loja: ${lojas[filtros.loja]}` : "Todas as Lojas"}</span>
        </SelectTrigger>
        <SelectContent className="combobox">
          <SelectItem value="todas">Todas</SelectItem>
          {Object.entries(lojas).map(([id, nome]) => (
            <SelectItem key={id} value={id}>{nome}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Input
          type="number"
          className="combobox"
          placeholder="Preço mínimo"
          value={filtros.precoMin || ""}
          onChange={(e) => setFiltros({ ...filtros, precoMin: Number(e.target.value) })}
        />
        <Input
          type="number"
          className="combobox"
          placeholder="Preço máximo"
          value={filtros.precoMax || ""}
          onChange={(e) => setFiltros({ ...filtros, precoMax: Number(e.target.value) })}
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
        <SelectTrigger className="combobox">
          <span>Ordenar por: {ordenarOpcoes[filtros.ordenarPor as keyof typeof ordenarOpcoes]}</span>
        </SelectTrigger>
        <SelectContent className="combobox">
          <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
          <SelectItem value="desconto">Maior Desconto</SelectItem>
          <SelectItem value="preco">Menor Preço</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};