import ProductModel from "../Models/ProductModel.js";

const createProduct = async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        await product.updateOne({ $set: req.body });
        res.status(200).json("Product Updated");
    } catch (error) {
        res.status(500).json(error);
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        await product.deleteOne();
        res.status(200).json("Product Deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
}
const getProductByCategory = async (req, res) => {
    try {
        const { Category } = req.body;

        if (!Category) {
            return res.status(400).json({ message: "Category is required in the request body." });
        }

        const products = await ProductModel.find({ Category: Category });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category." });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Pagination
const getProducts = async (req, res) => {
    try {
      let query = ProductModel.find();
  
      // Parse the page, limit, minPrice, and maxPrice from the query parameters
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 8;
      const skip = (page - 1) * pageSize;
      const minPrice = parseFloat(req.query.minPrice);
      const maxPrice = parseFloat(req.query.maxPrice);
  
      // Check if a category filter is provided in the query
      const categoryFilter = req.query.category;
  
      // Apply the category filter if provided
      if (categoryFilter) {
        query = query.where({ Category: categoryFilter });
      }
  
      // Apply price range filter if minPrice and maxPrice are provided
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        query = query.where('Price').gte(minPrice).lte(maxPrice);
      }
  
      // Execute the query to fetch the products
      const result = await query.skip(skip).limit(pageSize);
  
      // Create a separate query to count the total number of documents
      let countQuery = ProductModel.find();
  
      // Apply the category and price range filters to the count query
      if (categoryFilter) {
        countQuery = countQuery.where({ Category: categoryFilter });
      }
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        countQuery = countQuery.where('Price').gte(minPrice).lte(maxPrice);
      }
  
      // Execute the count query
      const total = await countQuery.countDocuments();
  
      // Calculate the total number of pages
      const pages = Math.ceil(total / pageSize);
  
      // If the requested page is out of range, return a 404 response
      if (page > pages) {
        return res.status(404).json({
          status: "fail",
          message: "Page not found",
        });
      }
  
      // Return the paginated and filtered results
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Server Error",
      });
    }
  };
  



export { createProduct, updateProduct, deleteProduct, getProduct, getProductByCategory, getProducts };