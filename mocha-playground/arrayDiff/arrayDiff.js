const diff = (c,d) => {  
  const c = [1,2,3], d = [2];
  return c.filter(n => !d.includes(n));
};

module.exports = diff;