import ProductCard from './components/ProductCard'
import productList from './data'

function App() {

  const renderProductCards = productList.map((product) => <ProductCard key={product.id} product={product} />)

  return (
    <div className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 p-2 m-5 rounded-md'>
      {renderProductCards}
    </div>
  )
}

export default App
