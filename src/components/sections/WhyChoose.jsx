// components/WhyChoose.jsx
export default function WhyChoose({ data }) {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {data.why_choose_section?.map((section, index) => (
          <div key={index} className="mb-12">
            <div className="text-center mb-8">
                <p className="text-lg text-gray-600">{section.sub_heading}</p>
                <h2 className="text-3xl font-bold">{section.heading}</h2>
              <div
                className="mt-4 prose max-w-none mx-auto"
                dangerouslySetInnerHTML={{ __html: section.left_text }}
              />
              {section.cta_button?.url && (
                <a
                  href={section.cta_button.url}
                  target={section.cta_button.target}
                  className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  {section.cta_button.title}
                </a>
              )}
            </div> 

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {section.icon_box?.map((box, idx) => (
                <div key={idx} className="text-center p-6 bg-white rounded-lg shadow">
                  {box.select_icon?.url && (
                    <img
                      src={box.select_icon.url}
                      alt={box.select_icon.alt}
                      className="w-16 h-16 mx-auto mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{box.heading}</h3>
                  <p className="text-gray-600 mb-2">{box.short_description}</p>
                  {box.cta_link?.url && (
                    <a
                      href={box.cta_link.url}
                      target={box.cta_link.target}
                      className="text-blue-600 underline"
                    >
                      {box.cta_link.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
