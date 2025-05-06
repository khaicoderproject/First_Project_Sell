const productModel = require("../../models/product.model");
const categoryModel = require("../../models/category.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");

// Get product detail
module.exports.detail = async (req, res) => {
    try {
        const slugProduct = req.params.slugProduct;
        const product = await productModel
            .findOne({ slugProduct: slugProduct })
            .lean();
        
        if (!product) {
            return res.status(404).render("client/pages/error/404");
        }

        // Format price
        product.price = formatCurrency(product.price);

        // Get related products
        const relatedProducts = await productModel
            .find({ 
                category_id: product.category_id,
                _id: { $ne: product._id }
            })
            .limit(4)
            .lean();

        // Format prices for related products
        relatedProducts.forEach(p => p.price = formatCurrency(p.price));

        res.render("client/pages/product/detail", {
            product,
            relatedProducts
        });
    } catch (error) {
        console.error("Error in product detail:", error);
        res.status(500).render("client/pages/error/500");
    }
};

// Get all products with filters
module.exports.index = async (req, res) => {
    try {
        // Get query parameters
        const { 
            minPrice, 
            maxPrice, 
            sort = 'newest',
            page = 1,
            limit = 12,
            search,
            category
        } = req.query;

        // Build filter query
        let query = { deleted: false };

        // Handle price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Handle category filter
        if (category) {
            // Find category by slug
            const categoryDoc = await categoryModel.findOne({ slug: category, deleted: false });
            if (categoryDoc) {
                query.category_id = categoryDoc._id;
            }
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

        // Get all categories
        const categories = await categoryModel.find({ deleted: false }).lean();

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

        // Format prices
        products.forEach(p => p.price = formatCurrency(p.price));

        res.render("client/pages/product/index", {
            products,
            categories,
            filters: {
                minPrice,
                maxPrice,
                sort,
                search,
                category
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
