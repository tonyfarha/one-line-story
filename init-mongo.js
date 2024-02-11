db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_INITDB_USERNAME,
  pwd: process.env.MONGO_INITDB_PASSWORD,
  roles: [{ role: 'readWrite', db: process.env.MONGO_INITDB_DATABASE }],
});


const password = process.env.MOCK_USERS_PASSWORD;

db.users.insertMany([
  { firstname: "Ross", lastname: "Geller", email: "ross.geller@email.com", password, role: 'admin' },
  { firstname: "Monica", lastname: "Geller", email: "monica.geller@email.com", password },
  { firstname: "Chandler", lastname: "Bing", email: "chandler.bing@email.com", password },
  { firstname: "Joey", lastname: "Tribbiani", email: "joey.tribbiani@email.com", password },
  { firstname: "Phoebe", lastname: "Buffay", email: "phoebe.buffay@email.com", password },
  { firstname: "Rachel", lastname: "Green", email: "rachel.green@email.com", password }
]);
