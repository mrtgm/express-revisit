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

module.exports = {
  showCourses: (req, res) => {
    res.render("courses", {
      offeredCourses: courses,
    });
  },
  showSignUp: (req, res) => {
    res.render("contact");
  },
  postedSignUpForm: (req, res) => {
    res.render("thanks");
  },
};
