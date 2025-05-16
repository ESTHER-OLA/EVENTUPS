export default function QuoteSection() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-chart-4 to-chart-5 opacity-90"></div>
      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div
        className="
          absolute inset-0
          bg-[url('/placeholder.jpg')]
          bg-cover bg-center
          mix-blend-overlay opacity-20
        "
      ></div>

      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <svg
            className="h-12 w-12 text-white mx-auto mb-6 opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-6 leading-relaxed">
            The best way to predict the future is to create it. Technology
            events are where innovation meets community, and where ideas
            transform into reality.
          </blockquote>

          <cite className="text-lg text-white font-medium">
            — TechConnect Community
          </cite>
        </div>
      </div>
    </div>
  );
}
