import app from "./app"

const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});
