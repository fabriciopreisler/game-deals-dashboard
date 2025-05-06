import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "./ui/select";
import { Filtros as FiltrosType } from "../types/tipos";

interface FiltrosProps {
  filtros: FiltrosType;
  setFiltros: (filtros: FiltrosType) => void;
}

export const Filtros = ({ filtros, setFiltros }: FiltrosProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Input
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
        <SelectTrigger>
          <span>{filtros.loja ? `Loja: ${filtros.loja}` : "Todas as Lojas"}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas</SelectItem>
          <SelectItem value="1">Steam</SelectItem>
          <SelectItem value="2">Epic Games</SelectItem>
          <SelectItem value="3">GOG</SelectItem>
          <SelectItem value="4">Nintendo eShop</SelectItem>
          <SelectItem value="5">Origin</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filtros.plataforma || "todas"}
        onValueChange={(valor) => {
          const newValue = valor === "todas" ? undefined : valor;
          setFiltros({ ...filtros, plataforma: newValue });
        }}
      >
        <SelectTrigger>
          <span>{filtros.plataforma || "Todas Plataformas"}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas Plataformas</SelectItem>
          <SelectItem value="PC">PC</SelectItem>
          <SelectItem value="PS4">PS4</SelectItem>
          <SelectItem value="PS5">PS5</SelectItem>
          <SelectItem value="Xbox One">Xbox One</SelectItem>
          <SelectItem value="Xbox Series X">Xbox Series X</SelectItem>
          <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filtros.ordenarPor || "avaliacao"}
        onValueChange={(valor) => 
          setFiltros({ 
            ...filtros, 
            ordenarPor: valor as "preco" | "desconto" | "avaliacao" | "data"
          })
        }
      >
        <SelectTrigger>
          <span>
            Ordenar por:{" "}
            {filtros.ordenarPor === "preco"
              ? "Preço"
              : filtros.ordenarPor === "desconto"
              ? "Desconto"
              : filtros.ordenarPor === "data"
              ? "Data"
              : "Avaliação"}
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
          <SelectItem value="desconto">Maior Desconto</SelectItem>
          <SelectItem value="preco">Menor Preço</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};