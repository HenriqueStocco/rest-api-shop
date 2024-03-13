export function getOrders (req, res) {
  res
    .status(200)
    .json({
      message: 'Orders were fetched'
    })
}

export function postNewOrder (req, res) {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res
    .status(201)
    .json({
      message: 'Orders was created',
      order: order
    })
}

export function getOrderId (req, res) {
  res
    .status(200)
    .json({
      message: 'Order details'
    })
}

export function deleteOrder (req, res) {
  res
    .status(200)
    .json({
      message: 'Order deleted'
    })
}
