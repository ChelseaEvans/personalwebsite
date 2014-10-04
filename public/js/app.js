(function() {
  'use strict';

  $(document).ready(function() {

    function getProjects() {
      var endpoint = '/projects';

      var projects = [];

      $.ajax({
        type: 'GET',
        url: endpoint,
        dataType: 'json',
        success: function(response) {
          console.log(response);
        },
        error: function(response) {
          alert('error = ' + response);
        }
      });
    }

    getProjects();
  });
}());
