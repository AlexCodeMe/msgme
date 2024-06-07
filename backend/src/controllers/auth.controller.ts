import { Request, Response } from "express"
import bcryptjs from "bcryptjs"
import prisma from "../db/prisma.js";
import generateToken from "../utils/generate-token.js";

export async function register(req: Request, res: Response) {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await prisma.user.findUnique({ where: { username } });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "female" ? girlAvatar : boyAvatar
            },
        })

        if (newUser) {
            generateToken(newUser.id, res)

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }
    } catch (error) {
        console.log("register Controller", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body
        const user = await prisma.user.findUnique({ where: { username } })

        if (!user) {
            return res.status(400).json({ error: "Invalid username" })
        }

        const passwordMatches = await bcryptjs.compare(password, user.password)
        if (!passwordMatches) {
            return res.status(400).json({ error: 'Invalid password' })
        }

        generateToken(user.id, res)

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log('login Controller', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function logout(req: Request, res: Response) {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
		res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log('logout Controller', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getMe(req: Request, res: Response) {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } })
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        res.status(200).json({
            id: user.id,
			fullName: user.fullName,
			username: user.username,  
			profilePic: user.profilePic,
        })
    } catch (error) {
        console.log('getMe Controller', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}