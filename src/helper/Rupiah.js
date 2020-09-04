const Rupiah= value => {
  let	number_string = value.toString(),
  sisa 	= number_string.length % 3,
  rupiah 	= number_string.substr(0, sisa),
  ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
  
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return rupiah
}

export default Rupiah