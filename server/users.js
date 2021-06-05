const users = [];

const addUser = ({ id, name, room }) => {
  // name, room: one string, lowercase
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // find existing user in room
  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };

  users.push(user);

  return { user, users };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // if OK -> found user
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
