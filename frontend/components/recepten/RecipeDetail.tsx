'use client';

import { useState } from 'react';
import { colors, spacing, borderRadius, shadows, recipeColors } from '@/lib/design-system';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Clock, Users, ChefHat, Copy, Check, Printer } from 'lucide-react';
import { Recipe } from './RecipeCard';

interface RecipeDetailProps {
  recipe: Recipe & {
    recept_ingredientenlijst: string[];
    recept_bereidingswijzelijst: string[];
  };
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.recept_aantal_personen);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  const servingMultiplier = servings / recipe.recept_aantal_personen;

  const primaryCuisine = recipe.recept_keuken[0]?.toLowerCase();
  const cuisineColor = primaryCuisine
    ? (recipeColors.cuisine as any)[primaryCuisine] || colors.accent.primary
    : colors.accent.primary;

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const copyShoppingList = () => {
    const list = recipe.recept_ingredientenlijst.join('\n');
    navigator.clipboard.writeText(list);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '400px',
          backgroundColor: colors.earth.clay,
        }}
      >
        <img
          src={recipe.recept_foto}
          alt={recipe.recept_naam}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop';
          }}
        />
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)`,
          }}
        />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.recept_keuken.map((cuisine) => (
                <span
                  key={cuisine}
                  className="px-3 py-1 text-sm font-medium rounded"
                  style={{
                    backgroundColor: cuisineColor,
                    color: colors.text.inverse,
                  }}
                >
                  {cuisine}
                </span>
              ))}
              {recipe.recept_gerechtsoort.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 text-sm font-medium rounded"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: colors.text.inverse,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {type}
                </span>
              ))}
            </div>

            <h1
              className="font-serif font-bold mb-4"
              style={{
                color: colors.text.inverse,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2',
              }}
            >
              {recipe.recept_naam}
            </h1>

            {recipe.recept_samenvatting && (
              <p
                className="text-lg mb-4"
                style={{
                  color: colors.text.inverse,
                  maxWidth: '600px',
                }}
              >
                {recipe.recept_samenvatting}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6">
              <div
                className="flex items-center gap-2"
                style={{ color: colors.text.inverse }}
              >
                <Clock size={20} />
                <span className="font-medium">{recipe.recept_bereidingstijd} minuten</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: colors.text.inverse }}
              >
                <Users size={20} />
                <span className="font-medium">{recipe.recept_aantal_personen} personen</span>
              </div>
              {recipe.recept_auteur && (
                <div
                  className="flex items-center gap-2"
                  style={{ color: colors.text.inverse }}
                >
                  <ChefHat size={20} />
                  <span className="font-medium">{recipe.recept_auteur}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[1fr,2fr] gap-8">
          {/* Ingredients */}
          <div>
            <div
              className="sticky top-24 p-6 rounded"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="font-serif font-bold text-xl"
                  style={{ color: colors.text.primary }}
                >
                  Ingrediënten
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyShoppingList}
                >
                  {copied ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Gekopieerd!
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" />
                      Kopieer lijst
                    </>
                  )}
                </Button>
              </div>

              {/* Servings Adjuster */}
              <div
                className="flex items-center justify-center gap-4 mb-6 p-4 rounded"
                style={{ backgroundColor: colors.accent.lighter }}
              >
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-8 h-8 rounded flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  −
                </button>
                <span
                  className="font-medium"
                  style={{ color: colors.text.primary }}
                >
                  {servings} {servings === 1 ? 'persoon' : 'personen'}
                </span>
                <button
                  onClick={() => setServings(servings + 1)}
                  className="w-8 h-8 rounded flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  +
                </button>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3">
                {recipe.recept_ingredientenlijst.map((ingredient, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checkedIngredients.has(index)}
                      onChange={() => toggleIngredient(index)}
                      className="mt-1"
                      style={{
                        accentColor: colors.accent.primary,
                      }}
                    />
                    <span
                      className={`flex-1 text-sm ${
                        checkedIngredients.has(index) ? 'line-through' : ''
                      }`}
                      style={{
                        color: checkedIngredients.has(index)
                          ? colors.text.tertiary
                          : colors.text.primary,
                      }}
                    >
                      {ingredient}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preparation Steps */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-serif font-bold text-2xl"
                style={{ color: colors.text.primary }}
              >
                Bereiding
              </h2>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer size={14} className="mr-1" />
                Print
              </Button>
            </div>

            <div className="space-y-6">
              {recipe.recept_bereidingswijzelijst.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{
                      backgroundColor: colors.accent.primary,
                      color: colors.text.inverse,
                    }}
                  >
                    {index + 1}
                  </div>
                  <p
                    className="flex-1 text-base leading-relaxed"
                    style={{
                      color: colors.text.primary,
                      paddingTop: '2px',
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags Section */}
            {(recipe.recept_type.length > 0 || recipe.recept_basis) && (
              <div
                className="mt-12 p-6 rounded"
                style={{
                  backgroundColor: colors.accent.lighter,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <h3
                  className="font-medium text-sm mb-3"
                  style={{ color: colors.text.secondary }}
                >
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.recept_type.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 text-sm rounded"
                      style={{
                        backgroundColor: colors.surface,
                        color: colors.text.primary,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {type}
                    </span>
                  ))}
                  {recipe.recept_basis?.map((basis) => (
                    <span
                      key={basis}
                      className="px-3 py-1 text-sm rounded"
                      style={{
                        backgroundColor: colors.surface,
                        color: colors.text.primary,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {basis}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
