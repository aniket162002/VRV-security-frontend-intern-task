export const mockApi = (() => {
    // Helper function to retrieve data from localStorage or return default data
    const getDataFromStorage = (key, defaultValue) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    };
  
    // Helper function to save data to localStorage
    const saveDataToStorage = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
  
    // Initialize users and roles from localStorage or with default values
    let users = getDataFromStorage("users", [
      { id: 1, name: "Alice", role: "Admin", status: "Active" },
      { id: 2, name: "Bob", role: "Editor", status: "Inactive" },
    ]);
    
    let roles = getDataFromStorage("roles", ["Admin", "Editor", "Viewer"]);
  
    return {
      getUsers: async () => users,
      addUser: async (user) => {
        const newUser = { id: Date.now(), ...user };
        users.push(newUser);
        saveDataToStorage("users", users);
        return newUser;
      },
      updateUser: async (id, updates) => {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
          users[index] = { ...users[index], ...updates };
          saveDataToStorage("users", users);
          return users[index];
        }
        throw new Error("User not found");
      },
      deleteUser: async (id) => {
        users = users.filter((user) => user.id !== id);
        saveDataToStorage("users", users);
        return id;
      },
      getRoles: async () => roles,
      addRole: async (role) => {
        roles.push(role);
        saveDataToStorage("roles", roles);
        return role;
      },
    };
  })();
  