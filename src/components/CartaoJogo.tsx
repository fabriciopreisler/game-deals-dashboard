import { useState } from 'react';
import { Jogo } from "../types/tipos";
import { formatarMoeda } from "../utils/formatadores";

interface CartaoJogoProps {
  jogo: Jogo;
  aoClicar: () => void;
  className?: string;
}

const getOptimizedImageUrl = (url: string) => {
  if (!url) return getPlaceholder();
  
  try {
    let optimizedUrl = url.replace('http://', 'https://');
    
    if (optimizedUrl.includes('steamcdn-a.akamaihd.net')) {
      optimizedUrl = optimizedUrl.replace('steamcdn-a.akamaihd.net', 'cdn.cloudflare.steamstatic.com');
    }
    
    if (optimizedUrl.includes('capsule_sm_120')) {
      optimizedUrl = optimizedUrl.replace('capsule_sm_120', 'header');
    }
    
    return optimizedUrl;
  } catch {
    return getPlaceholder();
  }
};

const getPlaceholder = () => {
  return 'https://via.placeholder.com/600x300/1a1a1a/ffffff?text=Imagem+Não+Disponível';
};

export const CartaoJogo = ({ jogo, aoClicar, className = '' }: CartaoJogoProps) => {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!jogo.capa) {
      return getPlaceholder();
    }
    return getOptimizedImageUrl(jogo.capa);
  });

  const handleImageError = () => {
    if (imgSrc.includes('header')) {
      const fallbackUrl = imgSrc.replace('header', 'capsule_616x353');
      setImgSrc(fallbackUrl);
      return;
    }
    setImgSrc(getPlaceholder());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      aoClicar();
    }
  };

  return (
    <div 
      className={`relative border border-gray-700 rounded-lg overflow-hidden transition-all cursor-pointer h-full flex flex-col group ${className}`}
      onClick={aoClicar}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalhes de ${jogo.titulo}`}
    >
      <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
      
      <div className="relative pt-[56.25%] overflow-hidden bg-gray-900">
        <img 
          src={imgSrc}
          alt={`Capa de ${jogo.titulo}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          style={{
            backgroundImage: `url(${getPlaceholder()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {jogo.desconto > 0 && (
          <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
            -{Math.round(jogo.desconto)}%
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col bg-gray-800 group-hover:bg-gray-700 transition-colors duration-300">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-white">
          {jogo.titulo || 'Nome não disponível'}
        </h3>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-lg font-bold text-green-400">
                {formatarMoeda(jogo.precoAtual)}
              </span>
              {jogo.precoOriginal > jogo.precoAtual && (
                <span className="text-xs text-gray-400 line-through block">
                  {formatarMoeda(jogo.precoOriginal)}
                </span>
              )}
            </div>
            {jogo.avaliacao && jogo.avaliacao > 0 && (
              <span className="flex items-center text-yellow-400 text-sm">
                ★ {jogo.avaliacao.toFixed(1)}
              </span>
            )}
          </div>
          
          {jogo.lojaNome && (
            <span className="text-xs text-gray-400 block truncate">
              {jogo.lojaNome}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};