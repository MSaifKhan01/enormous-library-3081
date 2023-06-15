//------ one-counter -------//

(function () {
    $('.chart-one').easyPieChart({
    //your configuration goes here
        easing: 'easeOut',
        delay: 3000,
        barColor: '#4285f4',
        trackColor: '#f7f7f7',
        scaleColor: false,
        lineWidth: 8,
        size: 150,
        scaleLength: 1,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
        this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

//----- two-counter -----//

(function () {
    $('.chart-two-one').easyPieChart({
        easing: 'easeOut',
        delay: 3000,
        barColor: '#4285f4',
        trackColor: '#f7f7f7',
        scaleColor: '#fff',
        lineWidth: 10,
        size: 170,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

(function () {
    $('.chart-two-two').easyPieChart({
        easing: 'easeOut',
        delay: 3000,
        barColor: '#7197b3',
        trackColor: '#f7f7f7',
        scaleColor: '#fff',
        lineWidth: 10,
        size: 170,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

(function () {
    $('.chart-two-three').easyPieChart({
        easing: 'easeOut',
        delay: 3000,
        barColor: '#73ca8d',
        trackColor: '#f7f7f7',
        scaleColor: '#fff',
        lineWidth: 10,
        size: 170,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

(function () {
    $('.chart-two-four').easyPieChart({
        easing: 'easeOut',
        delay: 3000,
        barColor: '#ea6a38',
        trackColor: '#f7f7f7',
        scaleColor: '#fff',
        lineWidth: 10,
        size: 170,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

var counted = 0;
$(window).scroll(function() {

  var oTop = $('.counter-three-wrapper').offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $('.count2').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    counted = 1;
  }

});

//--------- counter-four ---------//

(function () {

    $('.chart-four-1st').easyPieChart({
        //your configuration goes here
        easing: 'easeOut',
        delay: 3000,
        barColor: '#fff',
        trackColor: '#256ade',
        lineWidth: 12,
        size: 175,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

(function () {

    $('.chart-four-2nd').easyPieChart({
        //your configuration goes here
        easing: 'easeOut',
        delay: 3000,
        barColor: '#fff',
        trackColor: '#5783a5',
        lineWidth: 12,
        size: 175,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

(function () {

    $('.chart-four-3rd').easyPieChart({
        //your configuration goes here
        easing: 'easeOut',
        delay: 3000,
        barColor: '#fff',
        trackColor: '#61bf7d',
        lineWidth: 12,
        size: 175,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());

(function () {

    $('.chart-four-4th').easyPieChart({
        //your configuration goes here
        easing: 'easeOut',
        delay: 3000,
        barColor: '#fff',
        trackColor: '#ce5729',
        lineWidth: 12,
        size: 175,
        scaleLength: 0,
        lineCap:'square',
        animate: 5000,
        onStep: function(from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent);
        }
    });
}());


