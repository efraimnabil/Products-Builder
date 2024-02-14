import { IProduct } from "../interfaces/IProduct"
import { txtSlicer } from "../utils/functions"
import Button from "./Button"
import Image from "./Image"

interface IProps {
  product: IProduct
}

const ProductCard = ({product}: IProps) => {
  const {name, description, price, image} = product
  return (
    <div className="max-w-sm md:max-w-lg flex flex-col border rounded-m p-2 mx-auto">
        <Image 
          url={image}
          alt="Product Name" 
          className="rounded-md mb-2" 
        />

        <h3>{name}</h3>
        <p>{txtSlicer(description, 50)}</p>

        <div className="flex items-center my-4 space-x-2">
          <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
          <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
          <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${price}</span>
          <Image 
            url={image}
            alt="Product Name" 
            className="w-10 h-10 rounded-full object-center" />
        </div>

        <div className="flex items-center justify-between space-x-2 mt-5">
          <Button className="bg-indigo-600">Add to cart</Button>
          <Button className="bg-red-600">Buy now</Button>
        </div>

    </div>
  )
}

export default ProductCard