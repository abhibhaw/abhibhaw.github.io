$(document).ready(function() {
  $('#contact-form').submit(function(e) {
    var firstname    = document.getElementById('firstName')
    var lastname = document.getElementById('lastName')
    var email   = document.getElementById('email')
    var general   = document.getElementById('general')
    var enquire   = document.getElementById('enquire')
    var report-bug   = document.getElementById('report-bug')
    var join-team   = document.getElementById('join-team')
    var message = document.getElementById('message')

    if (!firstname.value || !email.value || !message.value) {
      alertify.error("Please check your entries");
      return false;
    } else {
      $.ajax({
        method: 'POST',
        url: '//formspree.io/abhibhaw3110@gmail.com',
        data: $('#contact-form').serialize(),
        datatype: 'json'
      });
      e.preventDefault();
      $(this).get(0).reset();
      alertify.success("Thanks for reaching! I will get back to you really soon.");
    }
  });
});