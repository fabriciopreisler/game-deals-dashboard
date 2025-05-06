import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Jogo } from "../types/tipos";
import { formatarMoeda } from "../utils/formatadores";

interface ModalDetalhesProps {
  jogo: Jogo | null;
  aberto: boolean;
  aoFechar: () => void;
}

export const ModalDetalhes = ({ jogo, aberto, aoFechar }: ModalDetalhesProps) => {
  if (!jogo) return null;

  const lojas: Record<string, string> = {
    "1": "Steam",
    "2": "Epic Games",
    "3": "GOG",
    "4": "Nintendo eShop",
    "5": "Origin"
  };

  return (
    <Dialog open={aberto} onOpenChange={aoFechar}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{jogo.titulo}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img 
            src={jogo.capa} 
            alt={`Capa do jogo ${jogo.titulo}`}
            className="rounded-lg w-full h-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Imagem+indisponível';
            }}
          />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {formatarMoeda(jogo.precoAtual)}
              </span>
              {jogo.desconto > 0 && (
                <span className="bg-green-500 text-white px-2 py-1 rounded">
                  -{jogo.desconto}%
                </span>
              )}
            </div>
            
            {jogo.precoOriginal && jogo.precoOriginal > jogo.precoAtual && (
              <p className="text-gray-500 line-through">
                De: {formatarMoeda(jogo.precoOriginal)}
              </p>
            )}
            
            <div>
              <p className="font-semibold">Avaliação: {jogo.avaliacao}/5</p>
              <p className="font-semibold">Loja: {lojas[jogo.loja] || jogo.loja}</p>
            </div>
            
            <div>
              <p className="font-semibold">Plataformas:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {jogo.plataformas?.map(plataforma => (
                  <span key={plataforma} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {plataforma}
                  </span>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full mt-4"
              onClick={() => window.open(`https://www.cheapshark.com/redirect?dealID=${jogo.id}`)}
            >
              Comprar na {lojas[jogo.loja] || jogo.loja}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};