export default function EmptyState({ title, message }) {
  return (
    <div className="text-center py-10 px-4">
      <p className="font-medium text-gray-600">{title}</p>
      {message && <p className="text-sm text-gray-400 mt-1">{message}</p>}
    </div>
  );
}
