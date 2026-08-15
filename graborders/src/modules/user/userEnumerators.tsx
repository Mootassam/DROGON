import Roles from 'src/security/roles';

const userEnumerators = {
  status: ['active', 'empty-permissions'],
  genre: ['male', 'female'],
  wallet: ["TRC20", "ERC20"],
  roles: Object.keys(Roles.values),
};

export default userEnumerators;
