const mongoose = require('mongoose')

// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//         }).then(()=>console.log('connected to db successfully')
//         ).catch((error)=>console.log(`Something went wrong ${error}`)
//         )
//     } catch (error) {
//         console.log(`Something went wrong ${error}`);
        
//     }
// }

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI
        ).then(()=>console.log('connected to db successfully')
        ).catch((error)=>console.log(`Something went wrong ${error}`)
        )
    } catch (error) {
        console.log(`Something went wrong ${error}`);
        
    }
}


module.exports = connectDB