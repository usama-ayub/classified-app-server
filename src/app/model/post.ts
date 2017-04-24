import * as mongoose from 'mongoose';
import User from '../../app/model/user'
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: String,
    description: String,
    img: String,
    category: String,
    createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isLike: Boolean,
    createTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', PostSchema);