import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

export default async function handler (req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
        try {
            const {username, password} = req.body
            const userFound = await User.findOne({ username: username });
            if(userFound) {
                res.status(409).json({ success: false })
                break
            }
            const user = new User({username, password})
            await user.save();
            res.status(201).json({ success: true, data: user })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        default:
        res.status(405).json({ success: false })
        break
    }
}