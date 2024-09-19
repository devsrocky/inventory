const mongoose = require('mongoose')
const CreateParentChild = async (Request, ParentModel, ChildModel, joinPropertyName) => {
    
    // create transaction session
    const session = await mongoose.startSession()

    try{
        // begin transaction
        await session.startTransaction();

        // first parent proccess
        let parent = Request.body['Parent']
        parent.UserEmail = Request.headers['email']
        let parentCreation = await ParentModel.create([parent], { session })

        // second child proccess
        let childs = Request.body['Childs']
        await childs.forEach((element) => {
            element[joinPropertyName] = parentCreation[0]['_id'];
            element['UserEmail'] = Request.headers['email']
        })

        let childCreation = await ChildModel.insertMany(childs, { session })

        // transaction success
        await session.commitTransaction()
        session.endSession()

        return {status: 'success', parent: parentCreation, childs: childCreation}

    }catch(err){
        // Roll back transaction if failed
        await session.abortTransaction()
        session.endSession()
        return {status: 'failed', data: err.toString()}
    }
}

// const CreateParentChild = async (Request, ParentModel, ChildModel, joinPropertyName) => {
//     try{

//         // parent creation
//         let Parent = Request.body['Parent']
//         Parent.UserEmail = Request.headers['email']
//         let parentCreation = await ParentModel.create(Parent)

//         // child creation
//         if(parentCreation['_id']){
//             try{
//                 let Childs = Request.body['Childs']
//                 await Childs.forEach((element) => {
//                     element[joinPropertyName] = parentCreation['_id'];
//                     element['UserEmail'] = Request.headers['email'];
//                 })
//                 let childCreation = await ChildModel.insertMany(Childs)
//                 return {status: 'success', Parent: Parent, Childs:Childs}

//             }catch(err){
//                 await ParentModel.deleteOne({'_id': parentCreation['_id']})
//                 return {status: 'failed', data: 'child creation failed'}
//             }

//         }else{
//             return {status: 'failed', data: 'Parent creation failed'}
//         }

//     }catch(err){
//         return {status: 'failed', data: err.toString()}
//     }
// }

module.exports = CreateParentChild;