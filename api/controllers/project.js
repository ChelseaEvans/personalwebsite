/*
 * Dependencies
 */
var request = require('request');

/*
 * Constants
 */
var BEHANCE_API_URL = 'https://www.behance.net/v2/';
var API_KEY = 'yUS47Pbe8rF4ChPBVlL0T62lXCll3FEm';

/*
 * Constructor
 */
function ProjectController() {};

ProjectController.prototype.get = function(res, res, next) {

  var endpoint = '/users/chelseaevans/projects';

  var options = {
    url: BEHANCE_API_URL + endpoint,
    method: 'GET',
    qs: {
      'api_key': API_KEY
    }
  };

  request(options, function(error, response, body) {
    var parsed = JSON.parse(body);
    res.status(200).json(parsed.projects);
  });
};


/*
 * Exports
 */
module.exports = new ProjectController();
