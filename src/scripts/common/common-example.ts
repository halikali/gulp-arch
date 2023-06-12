interface IUser {
  name: string;
  surname: string;
  date: number;
}

const user: IUser = {
  name: 'ali',
  surname: 'tunç',
  date: 25,
};


const getUser = () => {
  return user
}