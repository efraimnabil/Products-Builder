import ProductCard from './components/ProductCard'
import {categories, colors, formInputsList, productList} from './data'
import Modal from './components/ui/Modal'
import { FormEvent, useState } from 'react'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import { IProduct } from './interfaces'
import { productValidation } from './validation'
import ErrorMessage from './components/ErrorMessage'
import CircleColor from './components/ui/CircleColor'
import { v4 as uuid } from 'uuid'
import Select from './components/ui/Select'
import { TProductName } from './types'

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
  const [products, setProductList] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct)
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)

  // ** Handle Modal
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const closeEditModal = () => setIsOpenEdit(false)
  const openEditModal = () => setIsOpenEdit(true)

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

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ''
    })
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const {title, description, imageURL, price} = product
    const errors = productValidation({title, description, imageURL, price})

    const hasErrorMsg = Object.values(errors).some((err) => err === '') && Object.values(errors).every((err) => err === '') 

    if (!hasErrorMsg) {
      setErrors(errors)
      return
    }

    setProductList(prev => [{...product, id: uuid(), colors: selectedColors, category: selectedCategory}, ...prev])
    setProduct(defaultProduct)
    setSelectedColors([])
    closeModal()
  }

  const handleSubmitEdit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, price, imageURL } = productToEdit;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: selectedColors}
    setProductList(updatedProducts);

    setProductToEdit(defaultProduct);
    setSelectedColors([]);
    closeEditModal();
  }

  // **************** Renders **************** \\

  // ** Render Product Cards
  const renderProductCards = products.map((product, idx) => (
    <ProductCard 
      key={product.id} 
      product={product} 
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      setProductToEditIdx={setProductToEditIdx}
      setSelectedColors={setSelectedColors}
      idx={idx}
    />
  ))

  // ** Render Form Inputs
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

  // ** Render Form Inputs Edit
  const renderProductEditWithErrorMsg = (id: string, label: string, name: TProductName) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={handleChangeEdit} />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  // ** Render Product Colors
  const renderProductColors = colors.map((color) => (
    <CircleColor 
      key={color} 
      color={color} 
      onClick={() => {
        console.log('clicked')
        if (selectedColors.includes(color)) {
          setSelectedColors(prev => prev.filter((c) => c !== color))
          return;
        }
          setSelectedColors([...selectedColors, color])
      }} />
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
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {
              selectedColors.map((color) => (
                <span 
                  key={color} 
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  style={{backgroundColor: color}} 
                >
                  {color}
                </span>
              ))
            }
          </div>
          <div className="flex items-center space-x-3">
            <Button className='bg-indigo-600 hover:bg-indigo-800'>Submit</Button>
            <Button onClick={onCancel} className='bg-red-600 hover:bg-red-800'>Close</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isOpenEdit} closeModal={closeEditModal} title="Edit Product">
        <form className='space-y-3' onSubmit={handleSubmitEdit}>
          {renderProductEditWithErrorMsg('edit-title', 'Title', 'title')}
          {renderProductEditWithErrorMsg('edit-description', 'Description', 'description')}
          {renderProductEditWithErrorMsg('edit-imageURL', 'Image URL', 'imageURL')}
          {renderProductEditWithErrorMsg('edit-price', 'Price', 'price')}
          <Select 
            selected={productToEdit.category}
            setSelected={(value) => setProductToEdit({...productToEdit, category: value})}
          />
          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {selectedColors.map((color) => (
              <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ backgroundColor: color }}>
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-800">Submit</Button>
            <Button onClick={closeEditModal} className="bg-red-600 hover:bg-red-800">Close</Button>
          </div>
        </form>

      </Modal>
    </main>
  )
}

export default App
