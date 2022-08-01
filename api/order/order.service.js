const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection("order");
  return await collection.find(criteria).toArray();
  // var orders = await collection
  //     .aggregate([
  //         { $match: filterBy },
  //         {
  //             $addFields: {
  //                 userObjId: { $toObjectId: '$userId' },
  //                 gigObjId: { $toObjectId: '$gigId' },
  //             },
  //         },
  //         {
  //             $lookup: {
  //                 from: 'user',
  //                 foreignField: '_id',
  //                 localField: 'userObjId',
  //                 as: 'user',
  //             },
  //         },
  //         { $unwind: '$user' },
  //         {
  //             $lookup: {
  //                 from: 'gig',
  //                 foreignField: '_id',
  //                 localField: 'gigObjId',
  //                 as: 'gig',
  //             },
  //         },
  //         {
  //             $unwind: '$gig',
  //         },
  //         {
  //             $project: {
  //                 content: 1,
  //                 user: { _id: 1, username: 1 },
  //                 gig: { _id: 1, name: 1, price: 1 },
  //             },
  //         },
  //     ])
  //     .toArray()
  return orders;
}

async function addorder(order) {
  const collection = await dbService.getCollection("order");
  const addedorder = await collection.insertOne(order);
  return addedorder.ops[0];
}

async function update(order) {
  var id = ObjectId(order._id);
  delete order._id;
  const collection = await dbService.getCollection("order");
  await collection.updateOne({ _id: id }, { $set: { ...order } });
  order._id = id;
  return order;
}

module.exports = {
  query,
  addorder,
  update,
};

function _buildCriteria(filterBy) {
  const criteria = {};
  const { userId, isBuyer } = filterBy;
  console.log("isBuyer", isBuyer);

  if (userId) {
    if (isBuyer==='true') {
      criteria["buyer._id"] = filterBy.userId;
    } else {
      criteria["seller._id"] = filterBy.userId;
    }
  }
  console.log("criteria", criteria);

  return criteria;
}

// populate(data)
// async function populate(data) {
//   const collection = await dbService.getCollection('user');
//   await collection.insertMany(data)

// }



