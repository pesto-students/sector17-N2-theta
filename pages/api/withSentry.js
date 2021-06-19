const handler = async (req, res) => {
    throw new Error('API throw error test')
    res.status(200).json({ name: 'John Doe' })
}

export default handler;