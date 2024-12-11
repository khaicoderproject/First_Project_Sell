const avtMan = () => {
  const random = Math.floor(Math.random() * 8);
  return `https://bootdey.com/img/Content/avatar/avatar${random}.png`;
};
// const avtWoman = () => {
//   const random = Math.floor(Math.random() * 8);
//   console.log(random);
// };

module.exports = { avtMan };
