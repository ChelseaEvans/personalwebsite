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
          var portfolioProjectsEl = $('#portfolio-projects');

          var projects = response;

          projects = _.sortBy(projects, 'projects');
          projects = projects.slice(0, 3);

          _.each(projects, function(project) {
            console.log(project);

            var projectEl = $('<li></li>') .addClass('project');
            var projectAnchor = $('<a></a>').attr('href', project.url).attr('target', '_blank');
            projectAnchor.append($('<h3></h3>').text(project.name));
            projectAnchor.append($('<img></img>').attr('src', project.covers[202]));
            projectEl.append(projectAnchor);

            portfolioProjectsEl.append(projectEl);
          });
        },
        error: function(response) {
          alert('error = ' + response);
        }
      });
    }

    function smoothScroll() {
      $('a[href^="#"]').on('click',function (e) {
          e.preventDefault();

          var target = this.hash,
          $target = $(target);

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 900, 'swing', function () {
              window.location.hash = target;
          });
      });
    }

    getProjects();
    smoothScroll();
  });
}());
