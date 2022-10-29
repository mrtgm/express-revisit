const courses = [
  {
    title: "Up and Running with Redis",
    cost: 49,
  },
  {
    title: "HTML/CSS Bootcamp",
    cost: 99,
  },
  {
    title: "UX for Developers",
    cost: 149,
  },
];

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses,
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
