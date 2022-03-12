const Organization = require("../models/Organization");
const auth = require("../utilities/auth");
const GeocoderArcGIS = require("geocoder-arcgis");

const geocoder = new GeocoderArcGIS();

//Register Organization
exports.registerOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      $or: [
        { OrganizationID: req.body.OrganizationID },
        { email: req.body.email }
      ]
    });

    if (organization) {
      return res.status(400).json({
        error: "Organization with this ID or email already exists"
      });
    }

    console.log(req.body);
    const { name, email, address } = req.body;
    console.log(`${name}+${address}`);
    let loc = [];

    // geocoder
    //   .findAddressCandidates(address, {})
    //   .then((result) => {
    //     loc.push(result.candidates[0].location.x);
    //     loc.push(result.candidates[0].location.y);
    //     console.log(result.candidates[0]);
    //   })
    //   .catch(console.log);
    const result = await geocoder.findAddressCandidates(address, {});
    loc.push(result.candidates[0].location.x);
    loc.push(result.candidates[0].location.y);
    let location = { type: "Point", coordinates: loc };
    console.log(`locc====${location}`);
    const newOrganization = await Organization.create({
      name,
      email,
      address,
      location
    });

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

    const organization = await Organization.findOne({ email }).select(
      "+password"
    );

    if (
      !organization ||
      !(await Organization.correctPassword(password, organization.password))
    ) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(Organization._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: organization._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getOrganization = async (req, res) => {
  try {
    let Organization = await Organization.findById(req.params.OrganizationID);
    if (!Organization)
      return res.status(404).json({ error: "Invalid Organization ID" });

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

exports.chatbot = async (req, res) => {
  try {
    let Organization = await Organization.findById(req.params.OrganizationID);
    if (!Organization)
      return res.status(404).json({ error: "Invalid Organization ID" });

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
