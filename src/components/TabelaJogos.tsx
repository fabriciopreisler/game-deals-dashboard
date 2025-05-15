import { Jogo } from "../types/tipos";
import { formatarMoeda } from "../utils/formatadores";

interface TabelaJogosProps {
  data: Jogo[];
  onRowClick: (jogo: Jogo) => void;
}

export const TabelaJogos = ({ data, onRowClick }: TabelaJogosProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-roxo-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Jogo</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Preço Atual</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Desconto</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Loja</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {data.map((jogo) => (
            <tr 
              key={jogo.id} 
              onClick={() => onRowClick(jogo)}
              className="hover:bg-purple-900/30 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {jogo.titulo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                {formatarMoeda(jogo.precoAtual)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  jogo.desconto > 0 ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}>
                  {jogo.desconto > 0 ? `-${Math.round(jogo.desconto)}%` : 'Sem desconto'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {jogo.lojaNome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};