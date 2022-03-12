const Organization = require("../models/Organization");
const auth = require("../utilities/auth");

//Register Organization
exports.registerOrganization = async (req, res) => {
  try {
    const Organization = await Organization.findOne({
      $or: [{ OrganizationID: req.body.OrganizationID }, { email: req.body.email }]
    });

    if (Organization) {
      return res.status(400).json({
        error: "Organization with this ID or email already exists"
      });
    }

    const newOrganization = await Organization.create(req.body);

    const token = auth.signToken(newOrganization._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        userID: newOrganization._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//Organization Login
exports.loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;

    const Organization = await Organization.findOne({ email }).select("+password");

    if (
      !Organization ||
      !(await Organization.correctPassword(password, Organization.password))
    ) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(Organization._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: Organization._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};



exports.getOrganization = async (req, res) => {
  try {
    let Organization = await Organization.findById(req.params.OrganizationID);
    if (!Organization) return res.status(404).json({ error: "Invalid Organization ID" });

    return res.status(200).json({
      name: Organization.name,
      OrganizationID: Organization.OrganizationID,
      email: Organization.email,
      department: Organization.department,
      description: Organization.description,
      position: Organization.position
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
