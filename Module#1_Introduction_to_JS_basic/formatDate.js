// formatDate
// Write function that takes parameter of different types and returns date in ‘dd.mm.yy’ format

function formatDate(date) {
  const d = Array.isArray(date) ? new Date(...date) : new Date(date);
  const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  
  return `${da}.${mo}.${ye}`;
}

console.log(formatDate('2011-10-02')); // 02.10.11
console.log(formatDate(1234567890000)); // 14.02.09
console.log(formatDate([2014, 0, 1])); // 01.01.14
console.log(formatDate(new Date(2014, 0, 1))); // 01.01.14
