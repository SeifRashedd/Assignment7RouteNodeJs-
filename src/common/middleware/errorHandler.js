export const errHandler = (err, req, res, next) => {
    let status = err.cause || 500;
    if (err.name === "ValidationError") status = 400;
    if (err.code === 11000) status = 409;

    res.status(status).json({
        message: err.message || "Internal Server Error",
        status,
        stack: err.stack
    });
}
