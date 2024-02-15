import ProductCard from './components/ProductCard'
import {formInputsList, productList} from './data'
import Modal from './components/ui/Modal'
import { FormEvent, useState } from 'react'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import { IProduct } from './interfaces'
import { productValidation } from './validation'
import ErrorMessage from './components/ErrorMessage'

function App() {

  const defaultProduct: IProduct = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  }

  // state
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: ''
  })
  const [isOpen, setIsOpen] = useState(false)

  // ** Handle Modal
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setProduct({
      ...product,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ''
    })
  }

  const onCancel = () => {
    setProduct(defaultProduct)
    closeModal()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const {title, description, imageURL, price} = product
    const errors = productValidation({title, description, imageURL, price})

    const hasErrorMsg = Object.values(errors).some((err) => err === '') && Object.values(errors).every((err) => err === '') 

    if (!hasErrorMsg) {
      setErrors(errors)
    }

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
        value={product[input.name]}
        onChange={handleChange}
      />
      <ErrorMessage msg = {errors[input.name]} />
    </div>
  ))

  return (
    <main className="container">
      <Button onClick={openModal} className='bg-indigo-600 hover:bg-indigo-800'>Add Product</Button>
      <div className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 p-2 m-5 rounded-md'>
        {renderProductCards}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add Product">
        <form className='space-y-3' onSubmit={handleSubmit}>
          {renderFormInputs}
          <div className="flex items-center space-x-3">
            <Button className='bg-indigo-600 hover:bg-indigo-800'>Submit</Button>
            <Button onClick={onCancel} className='bg-red-600 hover:bg-red-800'>Close</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
