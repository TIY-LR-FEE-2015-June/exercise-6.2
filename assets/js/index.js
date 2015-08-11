var teachers = [
  {
    id: 1,
    name: 'Ryan',
  },
  {
    id: 2,
    name: 'Daniel',
  },
];

new AppView({
  el: '#target',
  collection: teachers,
});
