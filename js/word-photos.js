const WordPhotos = {
  savePhoto(word, url, callback) {
    $.getJSON(
      "save-photo.php?id=" +
      word.id +
      "&word=" +
      word.word +
      "&url=" +
      encodeURIComponent(url),
      callback
    );
  },
  getPhoto(entry, success, fail) {
    var imagePath = "img/words/" + entry.id + "-" + entry.word + ".jpg";
    $.ajax(imagePath)
      .done(function () {
        success(imagePath)
      })
      .fail(function () {
        fail()
      });
  },
  getSrcsFromUnsplash(term, callcback) {
    Helper.scrape("https://unsplash.com/search/photos/" + term, function (
      $html
    ) {
      var srcs = [];
  
      var $metas = $html.filter("meta"); // cannot use find
      $metas.each(function () {
        var property = $(this).attr("property");
        if (property) {
          if (property.includes("og:image:secure_url")) {
            srcs.push($(this).attr("content"));
          }
        }
      });
      callcback(srcs);
    });
  }
}