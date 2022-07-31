const dbService = require("../../services/db.service");
const utilService = require("../../services/utilService.js");
const ObjectId = require("mongodb").ObjectId;

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection("gig");
  var gigs = await collection.find(criteria).toArray();
  return gigs;
}

async function getById(gigId) {
  const collection = await dbService.getCollection("gig");
  const gig = collection.findOne({ _id: ObjectId(gigId) });
  return gig;
}

async function remove(gigId) {
  const collection = await dbService.getCollection("gig");
  await collection.deleteOne({ _id: ObjectId(gigId) });
  return gigId;
}

async function add(gig) {
  const collection = await dbService.getCollection("gig");
  const { ops } = await collection.insertOne(gig);
  return ops[0];
}
async function update(gig) {
  var id = ObjectId(gig._id);
  delete gig._id;
  const collection = await dbService.getCollection("gig");
  await collection.updateOne({ _id: id }, { $set: { ...gig } });
  gig._id = id;
  return gig;
}

async function addReview(review, gigId) {
  try {
    const collection = await dbService.getCollection("gig");
    review.id = utilService.makeId();
    review.createdAt = Date.now();
    await collection.updateOne(
      { _id: ObjectId(gigId) },
      { $push: { reviews: review } }
    );
    return review;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addMsg(gigId, msg) {
  const gig = await getById(gigId);
  gig.msgs = gig.msgs || [];
  gig.msgs.push(msg);
  update(gig);
}

function _buildCriteria(filterBy) {
  const { category, populary, min, max, time, sort } = filterBy;
  console.log(category, populary, min);
  const criteria = {};
  console.log("filterBy", filterBy);
  if (category) {
    const txtCriteria = { $regex: category, $options: "i" };
    criteria.category = txtCriteria;
  }
  if (min) {
    criteria.price = { $gte: parseInt(min) };
  }
  if (max) {
    criteria.price = { $lte: parseInt(max) };
  }
  if (time) {
    criteria.daysToMake = { $lte: parseInt(time) };
  }
  if (populary) {
    criteria["owner.rate"] = { $gte: parseInt(populary) };
  }
  // if (sort) {
  //   const sortBy = sort === "price" ? "price" : "name";
  //   criteria.sortBy = { $sort: 1 };
  //   criteria.sortBy = { $sort: -1 };
  // }

  return criteria;
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addReview,
  addMsg,
};
