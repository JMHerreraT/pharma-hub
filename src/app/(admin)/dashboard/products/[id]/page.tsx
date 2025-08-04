export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {id}</p>
    </div>
  )
}
