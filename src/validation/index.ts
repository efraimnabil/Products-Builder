/**
 * Validates a product object.
 *
 * @param {Object} product - The product to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.price - The price of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product's image.
 *
 * @returns {Object} An object containing any errors found during validation. Each key in the object corresponds to a property of the product, and the value is a string describing the error, or an empty string if there was no error.
 *
 * @example
 * const product = {
 *   title: 'Product Title',
 *   price: '100',
 *   description: 'Product Description',
 *   imageURL: 'http://example.com/image.jpg'
 * };
 *
 * const errors = productValidation(product);
 * if (errors.title) {
 *   console.error(`Title error: ${errors.title}`);
 * }
 * // etc...
 */
export const productValidation = (product: { title: string, price: string, description: string, imageURL: string }) => {
    // ** Return an object
    const errors: {
        title: string,
        price: string,
        description: string,
        imageURL: string
    } = {
        title: '',
        price: '',
        description: '',
        imageURL: ''
    }

    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL)

    if(!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = 'Title must be between 10 and 80 characters'
    }

    if(!product.description.trim() || product.description.length < 10 || product.description.length > 200) {
        errors.description = 'Description must be between 10 and 900 characters'
    }

    if(!product.imageURL.trim() || !validUrl) {
        errors.imageURL = 'Valid image URL is required'
    }

    if(!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = 'Price must be a number'
    }
    return errors
}