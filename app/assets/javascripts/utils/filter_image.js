window.filterImage = function (filters, $image) {


  $image.css('-webkit-filter', 'blur('+filters.bl+'px)' +
                               ' brightness('+filters.br+'%)' +
                               ' contrast('+filters.co+'%)' +
                               ' grayscale('+filters.gr+'%)' +
                               ' hue-rotate('+filters.hu+'deg)' +
                               ' invert('+filters.iv+'%)' +
                               ' saturate('+filters.sa+'%)' +
                               ' sepia('+filters.se+'%)');
 $image.css('filter', 'blur('+filters.bl+'px)' +
                              ' brightness('+filters.br+'%)' +
                              ' contrast('+filters.co+'%)' +
                              ' grayscale('+filters.gr+'%)' +
                              ' hue-rotate('+filters.hu+'deg)' +
                              ' invert('+filters.iv+'%)' +
                              ' saturate('+filters.sa+'%)' +
                              ' sepia('+filters.se+'%)');
}
