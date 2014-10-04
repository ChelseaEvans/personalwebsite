/*
 * Dependencies
 */
var request = require('request');

/*
 * Constants
 */
var BEHANCE_API_URL = 'http://behance.net/v2';
var API_KEY = 'yUS47Pbe8rF4ChPBVIL0T62IXCII3FEm';

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

  console.log(options.url);

  request(options, function(error, response, body) {
    console.log(body);

    var parsed = JSON.parse(body);

    res.status(200).json(response);
  });
};


/*
 * Exports
 */
module.exports = new ProjectController();
