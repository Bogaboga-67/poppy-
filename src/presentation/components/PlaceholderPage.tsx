export default function PlaceholderPage({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="px-8 py-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-[#aaa]">{body}</p>
    </div>
  );
}
