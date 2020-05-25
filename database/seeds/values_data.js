exports.seed = function (knex) {
  // Inserts seed entries
  return knex("values").insert([
    {
      value_name: "Arts and Literature",
      description:
        "This value is about the humanities, reading the stories of people, writing, designing, painitng...etc",
    },
    {
      value_name: "Career Growth",
      description:
        "Find ways to expand your horizons and defing what successmeans to you in terms of your career",
    },
    {
      value_name: "Creativity",
      description:
        "Keep tabs on your creativity skills and how you can do better with it",
    },
    {
      value_name: "Exercise",
      description:
        "How would you like to keep your body fit during this period?",
    },
    {
      value_name: "Health",
      description:
        "Find ways to keep your bod healthy, whether it is by eating nutrient dense foods or sleeping well",
    },
    {
      value_name: "Kindness and Generousity",
      description:
        "How can you be kinder? Find ways to be generous, whether it is with your time, money or resources",
    },
    {
      value_name: "Living in the moment",
      description:
        "Sometimes, we are so caught up with the past or the future that we forget to live in the moment. How do you want to change that?",
    },
    {
      value_name: "Membership in a social group",
      description:
        "We are all social animals. What kind of efforts do you wan to make to improve your social skills?",
    },
    {
      value_name: "Mental Health",
      description:
        "How do you want to improve your mental health? Get stated today!",
    },
    {
      value_name: "Music",
      description: "How do you want to imporove your love for music?",
    },
    {
      value_name: "My community",
      description: "What can you do to contribute to your community?",
    },
    {
      value_name: "Moral Pricniples",
      description:
        "We should all live by principes. IN what ways ca you be morally grounded?",
    },
    {
      value_name: "Nature and the environment",
      description:
        "Find ways to learn to take in the beauty of nature and appreciate it",
    },
    {
      value_name: "Others",
      description: "What other values do you have in mind to develop?",
    },
    {
      value_name: "Relationships with Friends and Family",
      description:
        "Friends and family is all we do have sometimes. What can we do to strengthen those bonds?",
    },
    {
      value_name: "Religion",
      description:
        "What is your religion? Where do you find comfort in when nothing makes sense?",
    },
    {
      value_name: "Romantic Relationships",
      description:
        "Ooh. Romantic companionship can be a thrilling experience. What kind of relationships do you want romantically? ",
    },
    {
      value_name: "Sense of Humour",
      description:
        "How do you want to improve your sense of humor? Tell more jokes? Laugh more? You choose!",
    },
    {
      value_name: "Stress Levels",
      description:
        "What do you want to do to keep your stress levels under check?",
    },
  ]);
};
