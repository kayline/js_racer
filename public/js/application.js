$(document).ready(function() {
  function update_player_position(name) {
    console.log("before " + counter);
    $('#' + name + '_strip .active').next().addClass('active');
    $('#' + name + '_strip .active').first().removeClass('active');
    console.log("after " + counter);
  };

  var game_id = $('.game_id').attr('name');

  var counter1 = $('#player1_strip').find('td').length;
  var counter2 = $('#player1_strip').find('td').length;
  var timer_start = new Date().getTime()

  $(document).on('keyup', function(event) {
    if (($('.finished').text() === "") && ($('.countdown').text() === 'Go!') ) {
      if(event.keyCode === 49) {
        update_player_position('player1');
        counter1 --;
        if (counter1 === 1 ) {
          $('.finished').text("Player 1 wins!!");
          var timer_finish = new Date().getTime()
          $.ajax ({
            type: 'post',
            url: '/finish',
            data: {'winner': '1', "game_id": game_id, "time": timer_finish - timer_start }
          });
        };
      };
      if(event.keyCode === 50) {
        update_player_position('player2')
        counter2 --;
        if (counter2 === 1) {
          $('.finished').text("Player 2 wins!!");
          var timer_finish = new Date().getTime()
          $.ajax ({
            type: 'post',
            url: '/finish',
            data: {'winner': '2', "game_id": game_id, "time": timer_finish - timer_start }
          });
        };
      };
    };

  });

  $('.restart').on('click', function(event) {
    $.ajax ({
      type: 'get',
      url: '/'
    })
    counter1 = $('#player1_strip').find('td').length;
    counter2 = $('#player1_strip').find('td').length;
    $('.finished').text("");
    $('tr td').removeClass();
    $('tr td:first-child').addClass('active');
    counter = 1;
    countdown;
  });


  var counter = 1
  var countdown = setInterval(function(){ 
    counter --; 
    if (counter > 0) {
      $('.countdown').text('Start in ' + counter);
    } else {
      $('.countdown').text('Go!');
    }
  }, 
  1000);
});
