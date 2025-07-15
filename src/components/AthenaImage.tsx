import React, { useState, useEffect } from 'react';
import { processAthenaImage } from '@/utils/backgroundRemoval';
import { Loader } from 'lucide-react';

interface AthenaImageProps {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export const AthenaImage: React.FC<AthenaImageProps> = ({ 
  className = "w-full h-full object-contain", 
  style,
  alt = "Athena - Deusa da Sabedoria" 
}) => {
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      // Check if we already have a processed image in localStorage
      const cached = localStorage.getItem('athena-processed-image');
      if (cached) {
        setProcessedImageSrc(cached);
        return;
      }

      setIsProcessing(true);
      try {
        const processedSrc = await processAthenaImage();
        setProcessedImageSrc(processedSrc);
        localStorage.setItem('athena-processed-image', processedSrc);
      } catch (err) {
        console.error('Failed to process Athena image:', err);
        setError('Falha ao processar imagem');
        // Fallback to new original image
        setProcessedImageSrc('/lovable-uploads/f07a1b69-9076-4c21-a39e-0eebe950ecfb.png');
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, []);

  if (isProcessing) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <Loader className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !processedImageSrc) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-xs text-muted-foreground">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <img 
      src={processedImageSrc || '/lovable-uploads/f07a1b69-9076-4c21-a39e-0eebe950ecfb.png'}
      alt={alt}
      className={className}
      style={style}
    />
  );
};