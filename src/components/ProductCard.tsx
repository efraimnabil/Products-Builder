import { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/functions"
import Button from "./ui/Button"
import Image from "./Image"
import CircleColor from "./ui/CircleColor"

interface IProps {
  product: IProduct
  setProductToEdit: (product: IProduct) => void
  openEditModal: () => void
  idx: number
  setProductToEditIdx: (idx: number) => void
  setSelectedColors: (colors: string[]) => void
}

const ProductCard = ({product, setProductToEdit, openEditModal, idx, setProductToEditIdx, setSelectedColors}: IProps) => {

  // **** State **** 
  const {title, description, price, imageURL, category, colors} = product

  // **** Renders ****

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color} 
      color={color} 
    />
  ))

  // **** Handlers ****

  const handleEdit = () => {
    setProductToEdit(product)
    setProductToEditIdx(idx)
    setSelectedColors(colors)
    openEditModal()
  }
    
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
        <Image 
          url={imageURL}
          alt={title}
          className="rounded-md h-52 w-full lg:object-cover"
        />

        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xs text-gray-500 break-words">{txtSlicer(description, 50)}</p>

        <div className="flex items-center flex-wrap space-x-1">
          {!colors.length ? <span className="text-xs text-gray-500">No colors</span> : renderProductColors}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg text-indigo-600 font-semibold">${price}</span>
          <Image 
            url={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-center" />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Button className="bg-indigo-600" onClick={handleEdit}>EDIT</Button>
          <Button className="bg-red-600">DELETE</Button>
        </div>

    </div>
  )
}

export default ProductCard