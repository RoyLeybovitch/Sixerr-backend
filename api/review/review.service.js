const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
  // const criteria = _buildCriteria(filterBy)
  const collection = await dbService.getCollection('testim')
  return await collection.find(criteria).toArray()
  var reviews = await collection
    .aggregate([
      { $match: filterBy },
      {
        $addFields: {
          userObjId: { $toObjectId: '$userId' },
          gigObjId: { $toObjectId: '$gigId' },
        },
      },
      {
        $lookup: {
          from: 'user',
          foreignField: '_id',
          localField: 'userObjId',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'gig',
          foreignField: '_id',
          localField: 'gigObjId',
          as: 'gig',
        },
      },
      {
        $unwind: '$gig',
      },
      {
        $project: {
          content: 1,
          user: { _id: 1, username: 1 },
          gig: { _id: 1, name: 1, price: 1 },
        },
      },
    ])
    .toArray()
  return reviews
}

async function addReview(review) {
  const collection = await dbService.getCollection('review')
  const addedReview = await collection.insertOne(review)
  return addedReview.ops[0]
}

module.exports = {
  query,
  addReview,
}

function _buildCriteria(filterBy) {
  const criteria = {}
  return criteria
}

// populate(data)
// async function populate(data) {
//   const collection = await dbService.getCollection('user');
//   await collection.insertMany(data)

// }
