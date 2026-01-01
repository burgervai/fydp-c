const db = require("../models");

// GET /api/medicine-shops
// Public: list active medicine shops
exports.getShops = async (req, res) => {
  try {
    const shops = await db.MedicineShop.findAll({
      where: { is_active: true },
      order: [["name", "ASC"]],
    });

    return res.json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (err) {
    console.error("Error fetching medicine shops:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to load medicine shops",
    });
  }
};

// GET /api/medicine-shops/search?q=paracetamol
// Public: build cross-shop search URLs (no scraping, just URL generation)
exports.searchAcrossShops = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Query parameter 'q' is required",
      });
    }

    const shops = await db.MedicineShop.findAll({
      where: { is_active: true },
      order: [["name", "ASC"]],
    });

    // Build search URLs safely (no crawling/scraping)
    const results = shops.map((shop) => {
      let searchUrl = shop.website;

      // If website is a domain, create a generic search format.
      // Many shops support `?q=` but not all; this is best-effort.
      if (shop.website.includes("?")) {
        searchUrl = `${shop.website}&q=${encodeURIComponent(q)}`;
      } else {
        searchUrl = `${shop.website}?q=${encodeURIComponent(q)}`;
      }

      return {
        id: shop.id,
        name: shop.name,
        website: shop.website,
        logo_url: shop.logo_url,
        search_url: searchUrl,
      };
    });

    return res.json({
      success: true,
      query: q,
      count: results.length,
      data: results,
    });
  } catch (err) {
    console.error("Error searching across shops:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to search medicine shops",
    });
  }
};
