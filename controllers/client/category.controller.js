const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");

// Get all categories for navigation
const getCategories = async () => {
    return await categoryModel.find({ deleted: false }).lean();
};

module.exports.index = async (req, res) => {
    try {
        const slug = req.params.slug;
        const { 
            sort = 'newest',
            page = 1,
            limit = 12,
            minPrice,
            maxPrice,
            search
        } = req.query;

        // Get category
        const currentCategory = await categoryModel.findOne({ slug: slug, deleted: false }).lean();
        if (!currentCategory) {
            return res.status(404).render("client/pages/error/404");
        }

        // Build filter query
        let query = { 
            category_id: currentCategory._id,
            deleted: false 
        };

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

        // Get all categories for navigation
        const categories = await getCategories();

        // Calculate category statistics
        const categoryStats = {
            totalProducts: total,
            averagePrice: 0,
            minPrice: 0,
            maxPrice: 0,
            inStock: 0
        };

        if (total > 0) {
            // Get all products in this category for accurate statistics
            const allProducts = await productModel.find({
                category_id: currentCategory._id,
                deleted: false
            }).lean();

            // Calculate price statistics
            const prices = allProducts.map(p => Number(p.price) || 0).filter(p => p > 0);
            
            if (prices.length > 0) {
                categoryStats.minPrice = Math.min(...prices);
                categoryStats.maxPrice = Math.max(...prices);
                categoryStats.averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
            }

            // Count in-stock products
            categoryStats.inStock = allProducts.filter(p => (p.quantity || 0) > 0).length;
        }

        // Format prices and add discount calculations
        products.forEach(product => {
            // Convert price to number and ensure it's valid
            const price = Number(product.price) || 0;
            product.price = formatCurrency(price) + " VND";
            
            if (product.discountPercentage) {
                const discountPercentage = Number(product.discountPercentage) || 0;
                const discountAmount = price * (discountPercentage / 100);
                const discountedPrice = price - discountAmount;
                product.discountedPrice = formatCurrency(discountedPrice) + " VND";
            }
        });

        res.render("client/pages/category/index", {
            currentCategory,
            products,
            categories,
            formatCurrency: (price) => formatCurrency(price) + " VND",
            filters: {
                sort,
                minPrice,
                maxPrice,
                search
            },
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages
            },
            stats: categoryStats
        });
    } catch (error) {
        console.error("Error in category page:", error);
        res.status(500).render("client/pages/error/500");
    }
};
