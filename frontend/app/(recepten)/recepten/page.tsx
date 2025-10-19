import Container from '@/components/layout/Container';

export default function ReceptenPage() {
  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#18181B] mb-4">
          Recepten
        </h1>
        <p className="text-lg text-[#52525B] max-w-2xl mx-auto">
          Ontdek heerlijke recepten uit verschillende keukens. Van Grieks tot Italiaans, 
          van snelle doordeweekse maaltijden tot feestelijke gerechten.
        </p>
      </div>

      {/* Coming soon placeholder */}
      <div className="bg-white rounded-lg p-12 text-center border border-[#E4E4E7]">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="font-serif text-2xl font-semibold text-[#18181B] mb-2">
          Binnenkort beschikbaar
        </h2>
        <p className="text-[#52525B]">
          We werken hard aan de receptenlijst. Kom snel terug!
        </p>
      </div>
    </Container>
  );
}
