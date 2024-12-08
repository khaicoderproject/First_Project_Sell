const user = () => {
  const randomPart = Math.floor(Math.random() * 1000000); // số ngẫu nhiên
  const timestampPart = Date.now(); // timestamp hiện tại (millisecond)
  const userId = `${timestampPart}${randomPart}`;
  return userId;
};
module.exports = { user };
