// Design Philosophy: Sci-Fi Holographic Minimalism
// Developer tools for quick testing

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function DevTools() {
  const { addCoins } = useGame();
  const [isVisible, setIsVisible] = useState(false);

  // Show dev tools with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) return null;

  const addTestCoins = (amount: number) => {
    addCoins(amount);
    toast.success(`Adicionado ${amount} moedas para teste!`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 glass-panel rounded-lg p-4 space-y-2 border-2 border-[oklch(0.7_0.2_45)]">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-[oklch(0.7_0.2_45)]" />
        <span className="text-sm font-bold text-foreground font-[family-name:var(--font-heading)]">
          DEV TOOLS
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => addTestCoins(100)}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          +100 Moedas
        </Button>
        <Button
          onClick={() => addTestCoins(1000)}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          +1,000 Moedas
        </Button>
        <Button
          onClick={() => addTestCoins(100000)}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          +100,000 Moedas
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        Ctrl+Shift+D para ocultar
      </p>
    </div>
  );
}
