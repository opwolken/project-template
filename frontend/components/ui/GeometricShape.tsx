import { colors } from '@/lib/design-system';

interface GeometricShapeProps {
  variant?: 'square' | 'circle' | 'rectangle' | 'line';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'light' | 'clay';
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  opacity?: number;
  rotate?: number;
  className?: string;
}

const sizeMap = {
  sm: '80px',
  md: '160px',
  lg: '240px',
  xl: '400px',
};

const colorMap = {
  primary: colors.accent.primary,
  secondary: colors.accent.secondary,
  light: colors.accent.light,
  clay: colors.earth.clay,
};

export default function GeometricShape({
  variant = 'square',
  size = 'md',
  color = 'light',
  position = {},
  opacity = 0.3,
  rotate = 0,
  className = '',
}: GeometricShapeProps) {
  const shapeSize = sizeMap[size];
  const shapeColor = colorMap[color];

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    ...position,
    opacity,
    transform: `rotate(${rotate}deg)`,
    pointerEvents: 'none',
    zIndex: 0,
  };

  if (variant === 'square' || variant === 'rectangle') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          width: variant === 'rectangle' ? `calc(${shapeSize} * 1.5)` : shapeSize,
          height: shapeSize,
          backgroundColor: shapeColor,
          borderRadius: '2px',
        }}
      />
    );
  }

  if (variant === 'circle') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          width: shapeSize,
          height: shapeSize,
          backgroundColor: shapeColor,
          borderRadius: '50%',
        }}
      />
    );
  }

  if (variant === 'line') {
    return (
      <div
        className={className}
        style={{
          ...baseStyle,
          width: shapeSize,
          height: '2px',
          backgroundColor: shapeColor,
        }}
      />
    );
  }

  return null;
}
