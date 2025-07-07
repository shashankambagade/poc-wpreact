// components/ContentBlock.jsx
export default function ContentBlock({ data }) {
  return (
   <section className="py-16 px-4 bg-gray-200 ">
      {data?.text_img_row?.map((row, index) => (
        <div
          key={index}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12 items-center"
        >
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: row.left_text }}
          />
          {row.right_image?.url && (
            <img
              src={row.right_image.url}
              alt={row.right_image.alt || ''}
              className="rounded shadow"
            />
          )}
        </div>
      ))}
    </section>
  );
}
