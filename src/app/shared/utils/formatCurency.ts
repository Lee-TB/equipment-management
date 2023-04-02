export function formatCurrency(number: number) {
  var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });
  return formatter.format(number);
}
