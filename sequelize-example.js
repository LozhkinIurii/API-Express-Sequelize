// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');

// // Initialize Express
// const app = express();
// const port = 3000;

// // Connect to SQLite database using Sequelize
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'database.sqlite',
// });

// // Define models for two tables
// const User = sequelize.define('User', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
// });

// const Post = sequelize.define('Post', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Define association between User and Post
// User.hasMany(Post);
// Post.belongsTo(User);

// // Synchronize the database (create tables if not exists)
// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Database synced');
//     })
//     .catch((err) => {
//         console.error('Error syncing database:', err);
//     });

// // Middleware to parse JSON requests
// app.use(express.json());

// // Define API routes

// // GET endpoint to search information by using multiple criteria
// app.get('/api/search', async (req, res) => {
//     try {
//         const { username, title } = req.query;

//         // Use Sequelize methods to query the database with criteria
//         const users = await User.findAll({
//             where: { username },
//             include: [{
//                 model: Post,
//                 where: { title },
//             }],
//         });

//         // Respond with JSON data
//         res.json(users);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // POST endpoint to add information
// app.post('/api/add', async (req, res) => {
//     try {
//         const { username, title, content } = req.body;

//         // Use Sequelize methods to create records in the database
//         const user = await User.create({ username });
//         const post = await Post.create({ title, content });

//         // Associate the user with the post
//         await user.addPost(post);

//         // Respond with JSON data
//         res.json({ message: 'Information added successfully' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // PUT endpoint to modify information
// app.put('/api/update/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, content } = req.body;

//         // Use Sequelize methods to update records in the database
//         const post = await Post.findByPk(id);
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         post.title = title;
//         post.content = content;
//         await post.save();

//         // Respond with JSON data
//         res.json({ message: 'Information updated successfully' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
