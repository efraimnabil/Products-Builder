import ProductCard from './components/ProductCard'
import {formInputsList, productList} from './data'
import Modal from './components/ui/Modal'
import { useState } from 'react'
import Button from './components/ui/Button'
import Input from './components/ui/Input'

function App() {

  // state
  const [isOpen, setIsOpen] = useState(false)

  // ** Handle Modal
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // ** Render Product Cards
  const renderProductCards = productList.map((product) => <ProductCard key={product.id} product={product} />)
  const renderFormInputs = formInputsList.map(input => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input 
        type={input.type}
        name={input.name}
        id={input.id}
      />
    </div>
  ))
  return (
    <main className="container">
      <Button onClick={openModal} className='bg-indigo-600 hover:bg-indigo-800'>Add Product</Button>
      <div className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 p-2 m-5 rounded-md'>
        {renderProductCards}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add Product">
        <div className='space-y-3'>
          {renderFormInputs}
          <div className="flex items-center space-x-3">
            <Button onClick={closeModal} className='bg-indigo-600 hover:bg-indigo-800'>Close</Button>
            <Button onClick={closeModal} className='bg-red-600 hover:bg-red-800'>Close</Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}

export default App
