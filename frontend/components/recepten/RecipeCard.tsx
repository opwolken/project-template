import Link from 'next/link';
import { colors, borderRadius, spacing, shadows, transitions, recipeColors } from '@/lib/design-system';
import Badge from '@/components/ui/Badge';
import { Clock, Users, ChefHat } from 'lucide-react';

export interface Recipe {
  id: string;
  recept_naam: string;
  recept_foto: string;
  recept_samenvatting: string;
  recept_keuken: string[];
  recept_gerechtsoort: string[];
  recept_type: string[];
  recept_basis?: string[];
  recept_auteur: string;
  recept_bereidingstijd: number;
  recept_aantal_personen: number;
  status: 'draft' | 'published';
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const primaryCuisine = recipe.recept_keuken[0]?.toLowerCase();
  const cuisineColor = primaryCuisine
    ? (recipeColors.cuisine as any)[primaryCuisine] || colors.accent.primary
    : colors.accent.primary;

  return (
    <Link href={`/recepten/${recipe.id}`}>
      <div
        className="group cursor-pointer h-full flex flex-col overflow-hidden"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.lg,
          transition: transitions.smooth,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = shadows.card;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            paddingBottom: '66.67%', // 3:2 aspect ratio
            backgroundColor: colors.earth.clay,
          }}
        >
          <img
            src={recipe.recept_foto}
            alt={recipe.recept_naam}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{
              transition: transitions.smooth,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop';
            }}
          />

          {/* Draft badge */}
          {recipe.status === 'draft' && (
            <div
              className="absolute top-2 right-2"
              style={{
                backgroundColor: colors.warning,
                color: colors.text.inverse,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.sm,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Concept
            </div>
          )}

          {/* Cuisine badge */}
          {recipe.recept_keuken.length > 0 && (
            <div
              className="absolute bottom-2 left-2"
              style={{
                backgroundColor: cuisineColor,
                color: colors.text.inverse,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.sm,
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {recipe.recept_keuken[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="flex-1 flex flex-col"
          style={{ padding: spacing.md }}
        >
          {/* Title */}
          <h3
            className="font-serif font-semibold mb-2 line-clamp-2"
            style={{
              color: colors.text.primary,
              fontSize: '1.125rem',
              lineHeight: '1.4',
            }}
          >
            {recipe.recept_naam}
          </h3>

          {/* Description */}
          <p
            className="mb-3 line-clamp-2 flex-1"
            style={{
              color: colors.text.secondary,
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
          >
            {recipe.recept_samenvatting}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Time */}
            <div className="flex items-center gap-1" style={{ color: colors.text.tertiary }}>
              <Clock size={14} />
              <span className="text-xs">{recipe.recept_bereidingstijd} min</span>
            </div>

            {/* Servings */}
            <div className="flex items-center gap-1" style={{ color: colors.text.tertiary }}>
              <Users size={14} />
              <span className="text-xs">{recipe.recept_aantal_personen} pers</span>
            </div>

            {/* Chef */}
            {recipe.recept_auteur && (
              <div className="flex items-center gap-1" style={{ color: colors.text.tertiary }}>
                <ChefHat size={14} />
                <span className="text-xs">{recipe.recept_auteur}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {recipe.recept_type.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {recipe.recept_type.slice(0, 2).map((type) => (
                <span
                  key={type}
                  className="text-xs px-2 py-0.5"
                  style={{
                    backgroundColor: colors.accent.lighter,
                    color: colors.text.secondary,
                    borderRadius: borderRadius.sm,
                  }}
                >
                  {type}
                </span>
              ))}
              {recipe.recept_type.length > 2 && (
                <span
                  className="text-xs px-2 py-0.5"
                  style={{
                    backgroundColor: colors.accent.lighter,
                    color: colors.text.secondary,
                    borderRadius: borderRadius.sm,
                  }}
                >
                  +{recipe.recept_type.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
