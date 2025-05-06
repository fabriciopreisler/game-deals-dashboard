import { Jogo } from "../types/tipos";
import { formatarMoeda } from "../utils/formatadores";

interface CartaoJogoProps {
  jogo: Jogo;
  aoClicar: () => void;
}

export const CartaoJogo = ({ jogo, aoClicar }: CartaoJogoProps) => {
  return (
    <div 
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
      onClick={aoClicar}
    >
      <div className="relative pt-[56.25%] overflow-hidden">
        <img 
          src={jogo.capa} 
          alt={jogo.titulo}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x169?text=Imagem+indisponível';
          }}
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{jogo.titulo}</h3>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-lg font-bold block">
              {formatarMoeda(jogo.precoAtual)}
            </span>
            {jogo.precoOriginal > jogo.precoAtual && (
              <span className="text-sm text-gray-500 line-through">
                {formatarMoeda(jogo.precoOriginal)}
              </span>
            )}
          </div>
          
          {jogo.desconto > 0 && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              -{jogo.desconto}%
            </span>
          )}
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {jogo.plataformas?.map(plataforma => (
            <span key={plataforma} className="bg-gray-100 px-2 py-1 rounded text-xs">
              {plataforma}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};