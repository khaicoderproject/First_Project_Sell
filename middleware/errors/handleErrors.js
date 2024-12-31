const internalServer = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/500");
  // res.status(500).json("loi roi ban oi!");
};
module.exports = internalServer;
