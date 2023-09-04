const registartionModal = require("./registratrionSchema");

const baseIndex = 1000;

const dataUpdater = async ( user , referral , level , time) => {
  try {
    const totalDocs = await registartionModal.countDocuments();
    const newIndex = totalDocs + Number(baseIndex);
    // save data in mongo db
     await new registartionModal({
      index: newIndex,
      user: user,
      referral: referral,
      level: level,
      time: time,
    }).save();
    return true;
  } catch (err) {
    return false;
  }
};

const getData = async (req, res) => {
  try {
    const data = await registartionModal.find({},{index:1,user:1,referral:1,level:1,time:1});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  dataUpdater,
  getData,
};
