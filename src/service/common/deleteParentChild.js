const { default: mongoose } = require("mongoose");

const deleteParentChild = async (Request, ParentModel, ChildModel, joinPropertyName) => {

    // create session
    const session = await mongoose.startSession()

    try{

        // begin session
        await session.startTransaction()

        let DeleteId = Request.params.id;
        let UserEmail = Request.headers['email'];

        let ChildsQueryObject = {};
        ChildsQueryObject[joinPropertyName] = DeleteId;
        ChildsQueryObject['UserEmail'] = UserEmail;

        let ParentQueryObject = {};
        ParentQueryObject['_id'] = DeleteId;
        ParentQueryObject['UserEmail'] = UserEmail;

        // first proccess
        let childDelete = await ChildModel.deleteMany(ChildsQueryObject).session(session)

        // second proccess
        let parentDelete = await ParentModel.deleteOne(ParentQueryObject).session(session)

        // commit transaction
        await session.commitTransaction()
        session.endSession()

        return {status: 'success', parent: parentDelete, childs: childDelete}


    }catch(err){
        // If failed transaction roll back
        await session.abortTransaction()
        session.endSession()
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = deleteParentChild;