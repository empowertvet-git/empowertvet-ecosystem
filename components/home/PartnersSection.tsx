import Image from 'next/image'

const PARTNERS = [
  {
    name: 'Getaway Gambia',
    logo: '/getaway-gambia-logo.jpeg',
    width: 200, // Adjust based on aspect ratio
    height: 80,
  },
  {
    name: 'CAPED',
    logo: '/caped-logo.jpeg',
    width: 200,
    height: 80,
  },
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Partners</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaborating with leading organizations to drive impact and innovation in TVET education.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale-0 opacity-90">
          {PARTNERS.map((partner) => (
            <div 
              key={partner.name} 
              className="relative flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              style={{ width: '280px', height: '160px' }}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
