export const asyncHandler = (handler) => async (req, res) => {
  try { 
    await handler(req, res)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(404).send({"message": err.message})
    } else if (err.name === 'CastError') {
      res.status(404).send({"message": "Cannot find given id."})
    } else {
      res.status(500).send({"message": err.message})
    }
  }
}