const dateToStatusTooth = [
  { parodontitis: "pink" },
  { caries: "pink" },
  { pulpitis: "pink" },
  { periodontitis: "pink" },
  { root: "pink" },
  { crown: "yellow" },
  { artificialTooth: "yellow" },
  { sealed: "yellow" },
  { absent: "gray" }
];

const propertiesRequiringTreatment = {
  parodontitis: "A",
  caries: "C",
  pulpitis: "P",
  periodontitis: "Pt",
  root: "R"
};

const propertiesTreatedTeeth = {
  crown: "К",
  artificialTooth: "И",
  sealed: "П"
};

const absent = {
  absent: "O"
};

export {
  dateToStatusTooth,
  propertiesRequiringTreatment,
  propertiesTreatedTeeth,
  absent
};
