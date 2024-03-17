
const bcrypt = require("bcrypt");
const { User } = require("../Schema/User");
const { Post } = require("../Schema/Post");
const jwt = require('jsonwebtoken');


module.exports = {
    Query: {
        users: async () => {
            return await User.find();
        },
        posts: async (parent, args) => {
            return await Post.find({ userId: args.userId }).sort({ createdAt: -1 });
        },
    },
    Mutation: {
        register: async (_, { registerInput: { name, email, password, followers, following } }) => {
            const isUserExisted = await User.findOne({ email: email });
            if (isUserExisted) {
                throw new Error('Email already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashedPassword,
                followers,
                following
            });
            // console.log(user.followers);
            const res = await user.save();
            return res;
        },
        login: async (_, { loginInput: { email, password } }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('User not found');
            }
            // console.log(user);
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            user.token = token;
            return token;
        },
        createPost: async (_, { postInput: { userId, content } }) => {

            if (!userId) {
                throw new Error('Authentication required');
            }

            const post = new Post({
                userId: userId,
                content: content,
            });
            return await post.save();
        },
        follow: async (parent, { userId }, { currentUser }) => {

            if (!currentUser) {
                throw new Error('Authentication required');
            }

            const userToFollow = await User.findById(userId);
            if (!userToFollow) {
                throw new Error('User not found');
            }

            currentUser.following.push(userToFollow);
            await currentUser.save();

            userToFollow.followers.push(currentUser);
            return await userToFollow.save();

        },
    }
};

