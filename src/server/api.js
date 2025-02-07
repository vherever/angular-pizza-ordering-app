const settings = require('./db/settings.json');
const pizzas = require('./db/pizza_templates.json');
const pizzerias = require('./db/pizzerias.json');

module.exports = (app) => {
  /**
   * SETTINGS
   */
  app.get(
    '/settings',
    (req, res) => {
      setTimeout(() => {
        res.status(200).json(settings)
      }, 500);
    }
  );

  /**
   * PIZZAS
   */
  app.get(
    '/pizzas',
    (req, res) => {
      setTimeout(() => {
        res.status(200).json(pizzas)
      }, 1500);
    }
  );

  /**
   * PIZZERIAS
   */
  app.get(
    '/pizzerias',
    (req, res) => {
      setTimeout(() => {
        res.status(200).json(pizzerias)
      }, 1500);
    }
  );

  /**
   * GET PIZZERIA BY ID
   */
  app.get(
    '/pizzerias/:id',
    (req, res) => {
      setTimeout(() => {
        const item = pizzerias[req.params.id - 1];
        if (item) {
          res.status(200).json(pizzerias[req.params.id - 1]);
        } else {
          res.status(404).end();
        }
      }, 1500);
    }
  );

  /**
   * GET PIZZERIA MENU
   */
  app.get(
    '/pizzerias/:id/pizzas',
    (req, res) => {
      setTimeout(() => {
        const item = pizzerias[req.params.id - 1];

        if (item) {
          const result = pizzas.filter((pizza) => pizza.available_in_pizzerias.some((o) => o === item.id + 1));
          res.status(200).json(result);
        } else {
          res.status(404).end();
        }
      }, 1500);
    }
  );

  /**
   * CONFIRM ORDER
   */
  app.post(
    '/confirm_order',
    (req, res) => {
      setTimeout(() => {
        res.status(200).end();
      }, 1500);
    }
  );
};
