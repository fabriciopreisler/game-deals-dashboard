import { Jogo } from "../types/tipos";
import { formatarMoeda, formatarData } from "../utils/formatadores";

interface ModalDetalhesProps {
  jogo: Jogo;
  aberto: boolean;
  aoFechar: () => void;
  carregando?: boolean;
  className?: string;
}

export const ModalDetalhes = ({ jogo, aberto, aoFechar, carregando, className }: ModalDetalhesProps) => {
  if (!aberto) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 ${className}`}>
      <div 
        className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {carregando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{jogo.titulo}</h2>
              <button 
                onClick={aoFechar}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
                aria-label="Fechar modal"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <img 
                  src={jogo.capa} 
                  alt={`Capa do jogo ${jogo.titulo}`}
                  className="w-full rounded-lg shadow-md aspect-[16/9] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Imagem+indisponível';
                  }}
                />
              </div>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-400">
                        {formatarMoeda(jogo.precoAtual)}
                      </span>
                      {jogo.precoOriginal > jogo.precoAtual && (
                        <span className="text-gray-400 line-through block text-sm">
                          {formatarMoeda(jogo.precoOriginal)}
                        </span>
                      )}
                    </div>
                    {jogo.desconto > 0 && (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        -{Math.round(jogo.desconto)}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
                  {jogo.lojaNome && (
                    <div>
                      <p className="text-gray-400">Loja:</p>
                      <p>{jogo.lojaNome}</p>
                    </div>
                  )}
                  {jogo.avaliacao && (
                    <div>
                      <p className="text-gray-400">Avaliação:</p>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        {jogo.avaliacao.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {jogo.metacriticScore && (
                    <div>
                      <p className="text-gray-400">Metacritic:</p>
                      <p>{jogo.metacriticScore}</p>
                    </div>
                  )}
                  {jogo.releaseDate && (
                    <div>
                      <p className="text-gray-400">Lançamento:</p>
                      <p>{formatarData(jogo.releaseDate)}</p>
                    </div>
                  )}
                </div>

                {jogo.descricao && (
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Descrição</h3>
                    <p className="text-gray-300 text-sm whitespace-pre-line">
                      {jogo.descricao}
                    </p>
                  </div>
                )}

                {jogo.linkDeal && (
                  <a
                    href={jogo.linkDeal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Ver Oferta na {jogo.lojaNome || 'Loja'}
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};