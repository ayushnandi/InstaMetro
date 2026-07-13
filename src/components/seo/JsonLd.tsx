// Renders a JSON-LD <script> tag. Escapes `<` per Next.js's JSON-LD guide to prevent
// the payload from breaking out into HTML if it ever contains user-influenced strings.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
