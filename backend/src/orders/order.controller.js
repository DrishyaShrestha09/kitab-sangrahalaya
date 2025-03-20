const createAOrder = async() =>{
try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
} catch (error) {
    console.error("Error creating a new order", error);
    res.status(500).json({message: "Failed to create a new order"});
}
}

module.exports = {
    createAOrder
}