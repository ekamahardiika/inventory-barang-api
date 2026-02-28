import app from './app';

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Server is runing on PORT: ${PORT}`);
})