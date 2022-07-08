const printRp = str => {
  return 'Rp '+ String(str).replace(/(.)(?=(\d{3})+$)/g,'$1,')
}

export {
  printRp
}