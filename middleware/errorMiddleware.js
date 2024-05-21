const errorHandler = (err, req, res, next) => {
  if (Array.isArray(err.array)) {
    const errors = err.array().map(error => ({ message: error.msg, param: error.param }));
    return res.status(400).json({ errors });
  }

  console.error('Error:', err); 

  let statusCode = err.statusCode || 500; 
  let message = err.message || 'Internal Server Error';

  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
