const app = require('./app')
const PORT = process.env.PORT || 5020
app.listen(PORT, () => {
    console.log('Application running on port @5020')
})