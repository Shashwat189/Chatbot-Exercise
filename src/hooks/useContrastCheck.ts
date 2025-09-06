import { useMemo } from 'react';
import { getContrastRatio } from '../utils/contrastUtils';

export function useContrastCheck(textColor: string, backgroundColor: string) {
  return useMemo(() => {
    const ratio = getContrastRatio(textColor, backgroundColor);
    return {
      ratio,
      isAccessible: ratio >= 4.5,
      isEnhanced: ratio >= 7,
      warning: ratio < 4.5 ? `Contrast ratio ${ratio.toFixed(1)}:1 is below WCAG AA standard (4.5:1)` : null
    };
  }, [textColor, backgroundColor]);
}