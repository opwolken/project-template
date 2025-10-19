import RecipeCard, { Recipe } from './RecipeCard';
import { colors } from '@/lib/design-system';

interface RecipeListProps {
  recipes: Recipe[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function RecipeList({
  recipes,
  loading = false,
  emptyMessage = 'Geen recepten gevonden.',
}: RecipeListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              backgroundColor: colors.surfaceAlt,
              borderRadius: '4px',
              height: '400px',
            }}
          />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div
        className="text-center py-16"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '4px',
        }}
      >
        <div className="text-6xl mb-4">🍽️</div>
        <p
          className="text-lg font-serif font-semibold mb-2"
          style={{ color: colors.text.primary }}
        >
          {emptyMessage}
        </p>
        <p className="text-sm" style={{ color: colors.text.secondary }}>
          Probeer een andere zoekopdracht of filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
