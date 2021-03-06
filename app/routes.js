var Food = require('./models/food');

function getFoods(res) {
  Food.find(function (err, foods) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(foods); // return all foods in JSON format
  });
};

module.exports = function (app) {

  // api ---------------------------------------------------------------------
  // get all todos
  app.get('/api/foods', function (req, res) {
    // use mongoose to get all foods in the database
    getFoods(res);
  });

  //display the cost of all food items
  app.get('/api/total', function (req, res) {

    //use moongoose to get all foods in the database
    Food.find(function (err, foods) {

      //add cost of each item and compute sales tax
      var cost = 0;
      for (i = 0; i < foods.length; i++) {
        if (foods[i].cost){
          cost += foods[i].cost;
        }
      };
      cost += (cost * .075);

      res.json(cost);
    });
  });

  // create food and send back all foods after creation
  app.post('/api/foods', function (req, res) {

    // create a food, information comes from AJAX request from Angular
    Food.create({
      name: req.body.text,
      cost: req.body.number,
      done: false
    }, function (err, food) {
      if (err)
        res.send(err);

      // get and return all the foods after you create another
      getFoods(res);
    });

  });

  // delete a food
  app.delete('/api/foods/:food_id', function (req, res) {
    Food.remove({
      _id: req.params.food_id
    }, function (err, food) {
      if (err)
        res.send(err);

      getFoods(res);
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};

