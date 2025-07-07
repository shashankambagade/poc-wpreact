// components/HeroSection.jsx
export default function HeroSection({ data }) {
  const { hero_image, heading, short_description, cta_button, cta_url } = data;

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6 lg:px-16 py-16 md:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero_image?.url || ''})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {heading}
        </h1>
        <div
          className="mt-4 text-lg md:text-xl"
          dangerouslySetInnerHTML={{ __html: short_description }}
        />
        {cta_url && (
          <div className="mt-6">
            <a
              href={cta_url}
              className="group px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-lg font-semibold transition inline-flex items-center"
            >
              {cta_button}
              <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
