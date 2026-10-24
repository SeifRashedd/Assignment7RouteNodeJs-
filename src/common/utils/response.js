export const response = ({ res, data, status = 200, message = 'done' }) => {
    res.status(status).json({
        message,
        data
    });
}