const productModel = require("../../models/product.model");
const categoryModel = require("../../models/category.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");
const newsModel = require("../../models/news.model");

// Get dashboard index
module.exports.index = async (req, res) => {
  // throw new Error(123);
  const products = await productModel.find({ deleted: false }).limit(5);
  const newProducts = await productModel
    .find({ deleted: false })
    .sort({ createdAt: "desc" })
    .limit(5);
  const news = await newsModel.find().sort({ createdAt: "desc" }).limit(5);
  res.render("client/pages/dashboard/index", {
    message: 123,
    products: products,
    formatCurrency,
    newProducts,
    news,
  });
};

// Get all products (Shop Now)
module.exports.products = async (req, res) => {
  try {
    // Get query parameters
    const { 
      category, 
      minPrice, 
      maxPrice, 
      sort = 'newest',
      page = 1,
      limit = 12,
      search
    } = req.query;

    // Build filter query
    let query = { deleted: false };

    // Handle category filter
    if (category) {
      const categoryDoc = await categoryModel.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    // Handle price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Handle search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort options
    let sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1;
        break;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get products with pagination
    const products = await productModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    // Get total count for pagination
    const total = await productModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Get all categories for filter
    const categories = await categoryModel.find().lean();

    // Format prices
    products.forEach(p => p.price = formatCurrency(p.price));

    res.render("client/pages/dashboard/products", {
      products,
      categories,
      filters: {
        category,
        minPrice,
        maxPrice,
        sort,
        search
      },
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error("Error in products page:", error);
    res.status(500).render("client/pages/error/500");
  }
};

module.exports.search = async (req, res) => {
  // const search = req.query.q;
  // const product = await productModel.find({
  //   deleted: false,
  //   status: "active",
  //   title: search,
  // });
  // // res.render("client/pages/dashboard/index", {});
  // console.log(product);
  // res.json(product);
  try {
    // Tìm kiếm sản phẩm với regex, đảm bảo tìm kiếm linh hoạt
    const search = req.query.q;
    const products = await productModel.find({
      deleted: false,
      status: "active",
      title: { $regex: new RegExp(search, "i") }, // 'i' là cờ không phân biệt chữ hoa, chữ thường
    });

    res.render("client/pages/category/index", {
      products: products,
      formatCurrency: formatCurrency,
    });
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while searching for products." });
  }
};
