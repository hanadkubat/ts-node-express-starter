import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import shortid from 'shortid';
import { PatchUserDto } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  constructor() {
    log('Created new instance of UsersDao');
  }

  Schema = mongooseService.getMongoose().Schema;
  userSchema = new this.Schema(
    {
      _id: String,
      email: String,
      // select: false => hide this field whenever we get a user or list of all users
      password: { type: String, select: false },
      firstName: String,
      lastName: String,
    },
    { id: false }
  );
  User = mongooseService.getMongoose().model('Users', this.userSchema);

  async addUser(userFields: CreateUserDto) {
    const userId = shortid.generate();
    const user = new this.User({
      _id: userId,
      ...userFields,
    });
    await user.save();
    return userId;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserByEmailWithPassword(email: string) {
    return this.User.findOne({ email: email })
      .select('_id email +password')
      .exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId }).exec();
  }

  async getUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateUserById(userId: string, userFields: PatchUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }
}

export default new UsersDao();
