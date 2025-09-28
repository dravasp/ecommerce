export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-2 shadow hover:shadow-lg">
      <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-600">₹{product.price}</p>
    </div>
  );
}
