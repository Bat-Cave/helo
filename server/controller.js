const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
      const {username, password} = req.body;
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
        const db = req.app.get('db');
        console.log('Created db variable')
        let user = await db.check_users(username);
        console.log(`Checked user. Received ${user}`)
        if(user[0]){
            return res.status(400).send('User already exists')
        }
        let salt = bcrypt.genSaltSync(10);
        console.log('Created salt')
        let hash = bcrypt.hashSync(password, salt);
        console.log('Created hash');
        let newUser = await db.register_user(username, hash);
        console.log(`Created new user. Received ${newUser}`);

        req.session.user = newUser[0];
        console.log('Created user on session')
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
      const {username, password} = req.body;
      const db = req.app.get('db');
      let user = await db.check_users(username);
      if(!user[0]){
          return res.status(400).send('Username not found');
      }

      let authenticated = bcrypt.compareSync(password, user[0].password);
      if(!authenticated){
          return res.status(401).send('Password is incorrect');
      }
      delete user[0].password;

      req.session.user = user[0];
      res.status(202).send(req.session.user);
    },
    getPosts: async (req, res) => {
      const {mine, search} = req.query;
      const db = req.app.get('db');


      const posts = await db.get_posts();
      res.status(200).send(posts);
    }
  }