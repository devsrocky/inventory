const CheckAssociation = async (QueryObject, ProductModel) => {
    try{

        let data = await ProductModel.aggregate([
            {$match: QueryObject}
        ])

        return data.length > 0;

    }catch(err){
        return {status: 'failed', data: err.toString()}
    }
}

module.exports = CheckAssociation;