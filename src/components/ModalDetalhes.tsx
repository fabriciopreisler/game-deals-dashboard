import { Jogo } from "../types/tipos";
import { formatarMoeda } from "../utils/formatadores";

interface ModalDetalhesProps {
  jogo: Jogo;
  aberto: boolean;
  aoFechar: () => void;
}

export const ModalDetalhes = ({ jogo, aberto, aoFechar }: ModalDetalhesProps) => {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{jogo.titulo}</h2>
          <button 
            onClick={aoFechar}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={jogo.capa} 
              alt={jogo.titulo}
              className="w-full rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Imagem+indisponível';
              }}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">
                {formatarMoeda(jogo.precoAtual)}
              </span>
              {jogo.desconto > 0 && (
                <span className="bg-green-500 text-white px-2 py-1 rounded">
                  -{jogo.desconto}%
                </span>
              )}
            </div>
            
            {jogo.precoOriginal > jogo.precoAtual && (
              <p className="text-gray-500 line-through mb-4">
                De: {formatarMoeda(jogo.precoOriginal)}
              </p>
            )}
            
            {jogo.plataformas && jogo.plataformas.length > 0 && (
              <div className="mb-4">
                <p className="font-semibold">Plataformas:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {jogo.plataformas.map((plataforma) => (
                    <span key={plataforma} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {plataforma}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};